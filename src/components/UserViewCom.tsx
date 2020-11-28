/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react-lite";
import { Button, Icon } from "antd-mobile";
import useStore from "../context/useStore";
import { withRouter } from "react-router-dom";
import socket from "../utils/socket";

const UserViewCom: React.FC = (props: any) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [pokerList, setPokerList] = useState<any>([]);
  const { Poker, Login } = useStore();

  useEffect(() => {
    socket.on("currentRoomUser", (res: any) => {
      console.log(res, "res");
      setIsReady(res.isReady);
      setIsStart(res.isStart);
      if (res.isStart) {
        setPokerList(res.outPokerList[(sessionStorage as any).getItem("user")]);
      }
    });
    socket.on("readyOkRes", (res: any) => {
      // console.log(res,"Res=>")
    });
  });

  function play() {
    socket.emit("readyOk", { user_id: Login.userInfo.user_id });
  }

  return useObserver(() => (
    <UserViewWrapper>
      <InnerDiv>
        {isStart ? (
          pokerList.map((item: any, index: number) => {
            return (
              <PokerCard key={index}>
                <CardNum
                  style={{
                    color: `${
                      item.type === 1 || item.type === 4 ? "red" : "black"
                    }`,
                  }}
                >
                  {item.pokerStatus}
                </CardNum>
                <CardNums
                  style={{
                    color: `${
                      item.type === 1 || item.type === 4 ? "red" : "black"
                    }`,
                  }}
                >
                  {item.pokerStatus}
                </CardNums>
                <li
                  style={{
                    backgroundImage: `url(${item.url})`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                ></li>
              </PokerCard>
            );
          })
        ) : (
          <Fragment>
            <PokerCard>
              <li
                style={{
                  backgroundImage:
                    "url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1968914019,545493827&fm=26&gp=0.jpg)",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                }}
              ></li>
            </PokerCard>
            <PokerCard>
              <li
                style={{
                  backgroundImage:
                    "url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1968914019,545493827&fm=26&gp=0.jpg)",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                }}
              ></li>
            </PokerCard>
            <PokerCard>
              <li
                style={{
                  backgroundImage:
                    "url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1968914019,545493827&fm=26&gp=0.jpg)",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                }}
              ></li>
            </PokerCard>
          </Fragment>
        )}
      </InnerDiv>
      <ButtonBox>
        {Login.userInfo.role === "2" ? (
          <Button
            size="small"
            style={{
              border: "none",
              width: "2rem",
            }}
            onClick={() => {
              socket.emit("againCreateOrder", {
                user_id: Login.userInfo.user_id,
                room_id: props.match.params.id,
              });
            }}
          >
            重新开始
          </Button>
        ) : (
          <></>
        )}
        <Button
          icon={isReady ? (isStart ? "check-circle-o" : "loading") : "loading"}
          size="small"
          style={{
            border: "none",
            width: "2rem",
          }}
          disabled={isReady}
          onClick={() => play()}
        >
          {isReady ? (isStart ? "进行中" : "等待中") : "准备"}
        </Button>
      </ButtonBox>
      <UserInfo>
        <Icon type={isReady ? (isStart ? "check-circle-o" : "loading") : "loading"} size="sm" /> {Login.userInfo.user}
      </UserInfo>
    </UserViewWrapper>
  ));
};

export default withRouter(UserViewCom);

const UserViewWrapper = styled.div`
  width: 5rem;
  height: 3rem;
  position: fixed;
  bottom: 0.1rem;
  left: 50%;
  transform: translateX(-50%);
  background: skyblue;
  padding: 0.1rem;
`;

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PokerCard = styled.div`
  width: 1rem;
  height: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.05rem;
  position: relative;
  border: 2px solid white;
`;

const CardNum = styled.span`
  width: 0.2rem;
  background: white;
  font-size: 12px;
  font-weight: 600;
  margin-left: 0.03rem;
  position: absolute;
  top: 0;
  left: 0;
`;
const CardNums = styled.span`
  width: 0.2rem;
  background: white;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotateZ(180deg);
`;

const UserInfo = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1rem 0;
`;
