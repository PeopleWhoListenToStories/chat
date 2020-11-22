import io from 'socket.io-client'
const socket: any = io("http://127.0.0.1:7001/", {
  reconnectionAttempts: 10,
  query: {
    id: sessionStorage.getItem("user"),
  },
});

export default socket
