import React from 'react'
import { ListGroup} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

import './Styles/Conversations/conversations.css'
export default function GlobalChat() {
const { selectedConversationIndex} = useConversations();

  return (
    <div>
        <ListGroup variant="flush" className='group'>
        <div className='conversation'>
        <ListGroup.Item 
          key={"1"}
          action
          onClick={() => {
            selectedConversationIndex("1")}}
          className="conversation-item"
        >
          {/* {Conversation.recipients.map(recipient => recipient.name).join(', ')}       */}
          
          GlobalChat
        </ListGroup.Item>
        </div>
    </ListGroup>
    </div>
  )
}
