import io from 'socket.io-client'
const socket: any = io("http://120.53.2.185/", {
  reconnectionAttempts: 10,
  query: {
    id: sessionStorage.getItem("user"),
  },
});

export default socket
