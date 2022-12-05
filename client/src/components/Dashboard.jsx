import React from 'react'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'

import Sidebar from './Sidebar'

export default function Dashboard({id,setId}) {
  const {selectedConversation} = useConversations();
  return (
      <div className="d-flex " style={{height: '100vh'}}>
          <Sidebar id={id} setId={setId}/>
          {selectedConversation && <OpenConversation/>}
      </div>
    
  )
}
