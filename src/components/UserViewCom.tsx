/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect,useState} from "react";
import styled from "styled-components";
import { useObserver } from "mobx-react-lite";
import { Button,   Icon,   WhiteSpace } from "antd-mobile";
import useStore from "../context/useStore";
import {withRouter} from "react-router-dom"
import socket from  "../utils/socket"
 
const UserViewCom: React.FC = (props: any) => {
  const  [isReady,setIsReady] = useState<boolean>(false)
  const { Poker, Login } = useStore();
  useEffect(() => {
    socket.on('readyOkRes',(res:any)=>{
      setIsReady(res.isReady)
    })
  } )
  function play() {
   
    socket.emit('readyOk', { user_id:Login.userInfo.user_id })
  }
  return useObserver(() => (
    <UserViewWrapper>
      <InnerDiv>
        {Poker.pokerList.length ? (
          Poker.pokerList.map((item: any, index: number) => {
            return (
              <PokerCard key={index}>
                <CardNum style={{ color:`${item.type === 1 || item.type === 4 ? 'red' : 'black'}`}}>{item.pokerStatus}</CardNum>
                <CardNums style={{ color:`${item.type === 1 || item.type === 4 ? 'red' : 'black'}`}}>{item.pokerStatus}</CardNums>
                <li
                style={{
                  backgroundImage:`url(${item.url})`,
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
      <Button
        icon="check-circle-o"
        size="small"
        style={{
          position: "relative",
          border: "none",
          width: "2rem",
          marginLeft: "50%",
          transform: "translate(-50%, .2rem)",
        }}
        disabled={isReady}
        onClick={() => play()}
      >
        {isReady ? "进行中" : "准备"}
      </Button>
      <WhiteSpace />
      <UserInfo>
       <Icon type="loading" size="sm" />
        {Login.userInfo.user}
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
  background: orangered;
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
  position:relative;
  border:2px solid white;
`;

const CardNum = styled.span`
  width: 0.2rem;
  background:white;
  font-size: 12px;
  font-weight: 600;
  margin-left: 0.03rem;
  position:absolute;
  top:0;
  left:0;
`;
const CardNums = styled.span`
  width: 0.2rem;
  background:white;
  font-size: 12px;
  font-weight: 600;
  position:absolute;
  bottom:0;
  right:0;
  transform: rotateZ(180deg);
`;

const UserInfo = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
