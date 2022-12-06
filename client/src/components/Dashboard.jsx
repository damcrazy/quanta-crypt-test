import React from 'react'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'

import Sidebar from './Sidebar'

export default function Dashboard({id,setId,setShowLogin}) {
  const {selectedConversation} = useConversations();
  return (
      <div className="d-flex " style={{height: '100vh'}}>
          <Sidebar id={id} setId={setId} setShowLogin={setShowLogin}/>
          {selectedConversation && <OpenConversation/>}
      </div>
    
  )
}
