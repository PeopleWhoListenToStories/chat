import io from 'socket.io-client'
const socket: any = io("http://192.168.83.1", {
  reconnectionAttempts: 10,
  query: {
    id: sessionStorage.getItem("user"),
  },
});

export default socket
