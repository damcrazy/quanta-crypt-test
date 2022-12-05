import React,{useContext,useState,useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketProvider({id,children}) {
  // console.log('id',id)
  const [socket,setSocket] = useState();
    useEffect(() => {
      // const newSocket = io('https://limitlesstalk.herokuapp.com/',
      const newSocket = io('http://127.0.0.1:5000/',
      {query:{id}})
        setSocket(newSocket)
        return () => { newSocket.close() }
    },[]);
    return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}
