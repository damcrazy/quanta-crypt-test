import React,{useContext,useState,useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()
const KeySocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function useKeySocket(){
    return useContext(KeySocketContext)
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
    <SocketContext.Provider value={socket} >
        {children}
    </SocketContext.Provider>
  )
}

export function KeySocket({id,children}) {
  // console.log('id',id)
  const [keySocket,setKeySocket] = useState();
  useEffect(() => {
    const keySocket = io('http://localhost:4444/',
    {query:{id}})
      setKeySocket(keySocket)
      return () => { keySocket.close() }
  },[]);



    return (
    <KeySocketContext.Provider value={keySocket} >
        {children}
    </KeySocketContext.Provider>
  )
}


