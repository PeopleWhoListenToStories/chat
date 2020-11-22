
// import React,{useContext,useState,useEffect} from 'react'

// const SocketContext = React.createContext()

// export function useSocket(){
//   return useContext(SocketContext)
// }

// export default function SocketProvider(id:any,children:any) {
//   const [socket,setSocket] = useState()
//   useEffect(()=>{
//     const newSocket = io('http://127.0.0.1:7001',{query:{id}})
//   })
//   return (
//     <SocketContext.Provider value={socket}>
//     {children}
//     </SocketContext.Provider>
//   )
// }
