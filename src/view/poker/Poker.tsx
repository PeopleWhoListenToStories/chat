/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import useStore from "../../context/useStore";
import socket from "../../utils/socket";
import { Modal } from "antd-mobile";

// 引入头部组件
import NavBarCom from "../../components/navBar/NavBar";
import UserViewCom from "../../components/UserViewCom";
import Play from "../../components/Play";
import Filling from "../../components/Filling";

const Poker: React.FC = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [exitOff, setExitOff] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const { Poker, Login } = useStore();
  function onLeftClick() {
    // 游戏中判断推出
    if (exitOff) {
      setVisible(true);
      // 退出房间清除用户状态
      socket.emit("userExitRoom", {
        room_id: props?.match.params.id,
        user_id: Login.userInfo.user_id,
      });
    } else {
      // 退出房间清除用户状态
      socket.emit("userExitRoom", {
        room_id: props?.match.params.id,
        user_id: Login.userInfo.user_id,
      });
      Poker.clearPokerList();
      props.history.goBack();
    }
  }

  function refreshPage() {
    socket.emit("refreshPage", {
      room_id: props?.match.params.id,
      user_id: sessionStorage.getItem("user"),
    });
  }
  refreshPage();

  useEffect(() => {
    socket.on("setRoomIdRes", (res: any) => {
      console.log(res, "res=-==09");
    });
    socket.on("currentRoomUser", (res: any) => {
      setStart(res.isStart);
      if (res.isStart) {
        Poker.saveUserPoker(res);
      }
      setExitOff(res.isReady);
    });
  });

  return useObserver(() => (
    <PokerWrapper>
      <NavBarCom
        onLeftClick={() => onLeftClick()}
        title={"房间" + props?.match.params.id}
      />
      <LeftUserWrapper>
        {Poker.pokerList.map((item: any, index) => {
          if (index === 0 || index === 1) {
            return <Play title={item.name + "√"} data={item.value} />;
          }
        })}
      </LeftUserWrapper>
      <RightUserWrapper>
        {Poker.pokerList.map((item: any, index) => {
          if (index === 2 || index === 3) {
            return <Play title={item.name + "√"} data={item.value} />;
          }
        })}
      </RightUserWrapper>
      <UserViewCom />
      {start ? <Filling /> : <></>}
      <Modal
        visible={visible}
        closable={true}
        transparent
        maskClosable={false}
        onClose={() => {
          setVisible(false);
        }}
        title="确定要退出吗?"
        footer={[
          {
            text: "取消",
            onPress: () => setVisible(false),
          },
          {
            text: "确认",
            onPress: () => {
              setVisible(false), Poker.clearPokerList();
              // 退出房间清除用户状态
              socket.emit("userExitRoom", {
                room_id: props?.match.params.id,
                user_id: Login.userInfo.user_id,
              });
              props.history.goBack();
            },
          },
        ]}
      ></Modal>
    </PokerWrapper>
  ));
};
export default withRouter(Poker);

const PokerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LeftUserWrapper = styled.div`
  width: 2rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  position: fixed;
  left: 0.1rem;
  top: 2rem;
`;

const RightUserWrapper = styled.div`
  width: 2rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0.1rem;
  top: 2rem;
`;
