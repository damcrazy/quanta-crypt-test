import React,{useState,useCallback} from 'react'
import {Form,InputGroup, Button} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

//css
import './Styles/OpenConversation/openconversation.css'
import SendIcon from '@material-ui/icons/Send';


export default function OpenConversation() {
    const [text,setText] = useState('');
    const setRef = useCallback((node) =>{
        if(node)
        node.scrollIntoView({behavior: 'smooth'});
    },[])
    const {sendMessage,selectedConversation} = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        if (text === '') return;
        sendMessage(selectedConversation.recipients.map(r => r.id), text);

        setText('');
    }   



  return (
    <div className="d-flex flex-column flex-grow-1 background ">
        <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column flex-grow-1  align-items-start justify-content-end p-3">
                {selectedConversation.messages.map((message,index) => {
                    const lastMessage = selectedConversation.messages.length - 1 === index 
                    return (
                        <div ref={lastMessage? setRef : null} key={index} className={`d-flex my-1 flex-column px-2 ${message.fromMe? 'align-self-end' : ""}`}>
                            <div className={` d-flex rounded px-2 py-1 ${message.fromMe ? ' chip': ' chip-1'} ` } >
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>{message.fromMe ? 'You' : message.senderName }</div>
                        </div>
                    )
                })}
        </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="form_group">
                <InputGroup className="p-2" >
                    <Form.Control
                    placeholder="Enter your message..."
                    className="form__input"
                    as="textarea"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{resize: 'none',borderRadius: '0px'}}
                    onKeyDown={(e) => {if(e.key === 'Enter') handleSubmit(e)}}
                    required />
                    {/* <InputGroup.Append> */}
                        <Button className="btn___primary" type="submit" style={{width: '5vw'}}><SendIcon/></Button>
                    {/* </InputGroup.Append> */}
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}
