import React,{useEffect} from "react";
import useStore from "../../context/useStore";
import io from "socket.io-client";

const SocketClient = (props:any) => {
  const { socketStore } = useStore();
  const socket: any = io("http://127.0.0.1:7001/", {
    reconnectionAttempts: 10,
    query: {
      id: sessionStorage.getItem("user"),
    },
  });
   useEffect(() => {
      console.log("==-====")
   }, [])
  // 创建socket连接，http使用ws协议，https使用wss协议

  // 接收消息
  socket.on("userLoginRes", (res: any) => {
    socketStore.onUserLoginRes(res);
  });
  socket.on("setRoomIdRes", (res: any) => {
    console.log(res,"==--=")
    socketStore.onSetRoomIdRes(res);
  });
  socket.on("message", (res: any) => {
    socketStore.onMessageRes(res);
  });

  return <></>;
};
export default  SocketClient;
