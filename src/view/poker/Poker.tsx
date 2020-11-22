/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import useStore from "../../context/useStore";
import socket from "../../utils/socket";
import { Modal, Button, WhiteSpace, WingBlank } from "antd-mobile";

// 引入头部组件
import NavBarCom from "../../components/navBar/NavBar";
import UserViewCom from "../../components/UserViewCom";

const Poker: React.FC = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [exitOff,setExitOff] = useState<boolean>(false);
  const { Poker, Login } = useStore();
  function onLeftClick() {
    // 游戏中判断推出
    if (exitOff) {
      setVisible(true);
    } else {
      // 退出房间清除用户状态
      socket.emit("userExitRoom", {room_id: props?.match.params.id, user_id: Login.userInfo.user_id });
      Poker.clearPokerList();
      props.history.goBack();
    }
  }

  socket.emit("refreshPage", { room_id: props?.match.params.id,user_id:Login.userInfo.user_id });

  useEffect(() => {
    socket.on("setRoomIdRes", (res: any) => {
      console.log(res, "res=-==09");
    });
    socket.on("readyOkRes", (res: any) => {
      console.log(res, "readyOkRes");
      //  if(res.isStart){
      //   Poker.createOrder({ room_id: props.match.params.id });
      // }
      setExitOff(res.isReady)
    });
  });

  return useObserver(() => (
    <PokerWrapper>
      <NavBarCom
        onLeftClick={() => onLeftClick()}
        title={"房间" + props?.match.params.id}
      />
      <LeftUserWrapper />
      <RightUserWrapper />
      <UserViewCom />
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
              socket.emit("userExitRoom", {room_id: props?.match.params.id, user_id: Login.userInfo.user_id });
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
  background: orangered;
  width: 2rem;
  height: 7rem;
  position: fixed;
  left: 0.1rem;
  top: 2rem;
`;

const RightUserWrapper = styled.div`
  background: orangered;
  width: 2rem;
  height: 7rem;
  position: fixed;
  right: 0.1rem;
  top: 2rem;
`;
