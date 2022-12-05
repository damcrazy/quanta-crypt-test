import React, { useContext, useState,useEffect,useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {

// console.log(id);

    const { contacts } = useContacts();
    const socket = useSocket();
    const [Conversations, setConversations] = useLocalStorage(
        "Conversations",
        []
    );
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    function createConversations(recipients) {
        setConversations((prevConversations) => {
            return [...prevConversations, { recipients, messages: [] }];
        });
    }




    const formattedConversations = Conversations.map((conversation, index) => {
        // console.log('conversation',(conversation.recipients))
        // // if(conversation.recipients.hasOwnProperty('recipents')){
        // //     console.log('wtf')
        // //     conversation.messages[0].text=conversation.recipients.text;
        // //     conversation.messages[0].sender=conversation.recipients.sender;
        // //     conversation.recipients = conversation.recipients.recipents;
        // // }
        // console.log('conversation1',conversation)
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







    // const addMessageToConversation = useCallback((recipients, text, sender ) =>{
    //     console.log('recipients-',recipients)
    //     setConversations((prevConversations) => {
    //         let madeChange = false;
    //         const newMessage = { sender,text };
    //         const newConversations = prevConversations.map((conversation) => {
    //             if (arrayEquals(conversation.recipients,recipients )) {
    //                 madeChange = true;
    //                 return {
    //                     ...conversation,
    //                     messages: [...conversation.messages, newMessage]

    //                 };
    //             }
    //             return conversation;
    //         });
    //         if (madeChange) {
    //             return newConversations;
    //         } else {
    //             return [...prevConversations, { recipients, messages: [newMessage] }]
    //         }
    //     });
    // },[setConversations]);

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
      console.log(recipients)
      console.log(sender)
      console.log(text)
        setConversations(prevConversations => {
          let madeChange = false
          const newMessage = { sender, text }

          const newConversations = prevConversations.map(conversation => {
            console.log("conversation",conversation)
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
      console.log("a",a)
      console.log("b",b)
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
        socket.on("recive-message", addMessageToConversation);
        
        return () => { socket.off("recive-message"); }
    },[socket,addMessageToConversation]);




    function sendMessage(recipients, text) {
      // console.log(id)
        socket.emit('send-message', { recipients, text });
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
