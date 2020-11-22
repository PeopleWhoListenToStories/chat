import React, { useEffect, useState,Fragment } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import useStore from "../../context/useStore";
import { Grid } from "antd-mobile";
import socket from "../../utils/socket";
import { Toast, Tag } from "antd-mobile";

// 引入组件
import PokerRoom from "../../components/PokerRoom";
import UserPortrait from "../../components/userPortrait/UserPortrait";

const Main: React.FC = (props: any) => {
  const [roomList, setRoomList] = useState<any>([]);
  const [count, setCount] = useState<number>(0);

  const history = useHistory();
  const { Login } = useStore();
  useEffect(() => {
    if (count === 0) {
      socket.emit("roomInfo", {});
    }
    return () => {
      setCount(1);
    };
  });
  useEffect(() => {
    socket.on("messsage", (res: any) => {
      setRoomList(res.isFullList);
      console.log(res, "Res");
    });
    socket.on("userLoginRes", (res: any) => {
      console.log(res, "res");
      Toast.info(res.msg);
    });
  });
  const data1 = Array.from(new Array(9)).map(() => ({
    icon:
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg",
  }));

  function ClickToPoker(id: number | string) {
    socket.emit("setRoomId", { user_id: Login.userInfo.user_id, room_id: id });
    history.push("/poker/" + id);
  }
  return useObserver(() => (
    <MainWrapper className="Main">
      <TitleWrapper>Welcome To Home</TitleWrapper>
      {/* <PokerRoom /> */}
      <div className="sub-title">
        <UserPortrait />
      </div>
      <Grid
        data={roomList}
        columnNum={3}
        renderItem={(dataItem: any, index: number) => (
          <Fragment>
            <Tag>{dataItem.isFull ? "满" : ""}</Tag>
            <div
              style={{ padding: "0.125rem" }}
              onClick={() => ClickToPoker(index + 1)}
            >
              <img
                src={dataItem.url}
                style={{ width: "1rem", height: "1rem" }}
                alt=""
              />
              <div
                style={{ color: "#888", fontSize: "14px", marginTop: "0.12rem" }}
              >
                <span>房间{index + 1}</span>
              </div>
            </div>
          </Fragment>
        )}
      />
    </MainWrapper>
  ));
};
// export default injectIntl(Main);
export default Main;

const MainWrapper = styled.div`
  wdith: 100%;
  height: 100%;
  h2 {
    padding: 0.2rem;
  }
`;

const TitleWrapper = styled.div`
  wdith: 100%;
  height: 1rem;
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
`;
