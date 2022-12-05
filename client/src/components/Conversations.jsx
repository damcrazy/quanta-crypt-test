import React,{useState} from 'react'
import { ListGroup ,Modal, Button} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

import './Styles/Conversations/conversations.css'
import CloseIcon from '@material-ui/icons/Close';
export default function Conversations() {
  const { Conversations,selectedConversationIndex,setDel} = useConversations();
  const [modalOpen, setModalOpen] = React.useState(false);
  function closeModal(){
    setModalOpen(false);
  }
  const [delIndex,setDelIndex] = useState(-1);
  return (
    <ListGroup variant="flush" className='group'>
      {Conversations.map((Conversation,index) => (
        <div key={index} className='conversation'>
        <ListGroup.Item 
          key={Conversation.id}
          action
          onClick={() => {
            selectedConversationIndex(index)}}
          active={Conversation.selected}
          className="conversation-item"
        >
          {Conversation.recipients.map(recipient => recipient.name).join(', ')}      
          
            
        </ListGroup.Item>
        <button onClick={() => {setModalOpen(true);setDelIndex(index);}} className="close">
          <CloseIcon className="conversation-item__close" /></button>
        </div>
      ))}
        <Modal show={modalOpen} onHide={closeModal} >
        <>
        <Modal.Header closeButton className='Modal-body'>Are you sure?</Modal.Header>
            <Modal.Body className='Modal-body'>
            <Button className='Modal-button yes' onClick={() => {setDel(delIndex);setDelIndex(-1);setModalOpen(false);}}>Yes</Button>
            <Button className='Modal-button no' onClick={() => {setModalOpen(false);setDelIndex(-1);}}>No</Button>
        </Modal.Body>
    </>
        </Modal>
    </ListGroup>
  )
}
