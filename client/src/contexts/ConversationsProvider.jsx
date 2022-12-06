import React, { useContext, useState,useEffect,useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import  {useSocket,useKeySocket}  from "./SocketProvider";
import CryptoJS from "crypto-js";
import axios from "axios";





const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  
  // console.log(id);
  
  const [key, setKey] = useState("test");
  const { contacts } = useContacts();
  const socket = useSocket();
  const keySocket = useKeySocket();
    const [Conversations, setConversations] = useLocalStorage(
        "Conversations",
        []
    );
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);




    function createConversations(recipients) {
      

      let keyPair = {
        sender : id,
        receiver : recipients[0]
      }

      //key request goes here
      keySocket.emit("request-key",keyPair);



        setConversations((prevConversations) => {
            return [...prevConversations, { recipients, messages: [] }];
        });
    }




    const formattedConversations = Conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find((contact) => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });

        // console.log(conversation.messages)

        const messages = conversation.messages.map(message => 
            {
                const contact = contacts.find((contact) => {
                    return contact.id === message.sender;
                });
                const name = (contact && contact.name) || message.sender;
                const fromMe = id === message.sender;
                // console.log('%c%s', 'color: #007300', id);
                // console.log('%c%s', 'color: #807160', message.sender);
                return { ...message, senderName:name,fromMe };
            })

        const selected = index === selectedConversationIndex
        return { ...conversation,messages, recipients, selected };
    });



    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
          let madeChange = false
          const newMessage = { sender, text }
          const newConversations = prevConversations.map(conversation => {
            if (arrayEquals(conversation.recipients, recipients)) {
              madeChange = true
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage]
              }
            }
            return conversation
          })
          if (madeChange) {
            return newConversations
          } else {
            return [
              ...prevConversations,
              { recipients, messages: [newMessage] }
            ]
          }
        })
      }, [setConversations])



    function arrayEquals(a, b) {
        if (a.length !== b.length) return false
      
        a.sort()
        b.sort()
      
        return a.every((element, index) => {
          return element === b[index]
        })
      }


useEffect(() => {
  if(socket == null){
    return;
}
  keySocket.on("encode",(data)=>{
    console.log(data);
  // keySocket.emit("decode",{key:data.key});
  })
  keySocket.on("response",(data)=>{
    setKey(data.key);
    console.log(data.key);
  })
},[keySocket])

    useEffect(() => {
        if(socket == null){
            return;
        }
        socket.on("recive-message",({recipients,text,sender})=>{

          var bytes  = CryptoJS.AES.decrypt(text, key);
          
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          console.log(originalText);
          addMessageToConversation({recipients,text:originalText,sender})
      }
        );
        
        return () => { socket.off("recive-message"); }
    },[socket,addMessageToConversation]);




    function sendMessage(recipients, text) {
      //encrypt message here
      var ciphertext = CryptoJS.AES.encrypt(text, key).toString()
      // console.log(ciphertext)
      
        socket.emit('send-message', { recipients, text:ciphertext });
        addMessageToConversation({recipients, text, sender:id});
    }

    const [del,setDel] = useState(-1);

    useEffect(() => {
      // console.log(del)
        if(del === -1){
            return;
        } else {
            setConversations(prevConversations => {
                return prevConversations.filter((conversation,index) => {
                    return index !== del;
                } )
            } )
        }
        setDel(-1);
    } ,[del])



    return (
        <ConversationsContext.Provider
            value={{ setDel: setDel,sendMessage,Conversations: formattedConversations, selectedConversation: formattedConversations[selectedConversationIndex], selectedConversationIndex: setSelectedConversationIndex,  createConversations }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}
