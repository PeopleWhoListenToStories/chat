import { action, observable } from "mobx";
import socket from "../../utils/socket"
// const socket: any = io("http://127.0.0.1:7001/", {
//   reconnectionAttempts: 10,
//   query: {
//     id: sessionStorage.getItem('user'),
//   },
// });
 


export default class Socket {
  @observable off: boolean = false;
  @action async userLogin(params:any){
    socket.emit("userLogin", params );
  }
  @action async setRoomId(params:any){
    socket.emit("setRoomId", params );
  }
  @action async message(params:any){
    socket.emit("message", params );
  }
  @action async onUserLoginRes(res:any){ 
    console.log(res,".....onUserLoginRes")
  }
  @action async onMessageRes(res:any){ 
    console.log(res,".....onMessageRes")
  }
  @action async onSetRoomIdRes(res:any){
    socket.emit(res,"...setRoomIdRes"  );
  }

}
