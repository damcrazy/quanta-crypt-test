import React from 'react'
import {useContacts} from '../contexts/ContactsProvider'

import { ListGroup } from 'react-bootstrap'

export default function Contact() {

    const {contacts} = useContacts()

  return (
    <ListGroup varient="flush" className='group'>
        {contacts.map(contact => (
            <ListGroup.Item key={contact.id} className="conversation-item">
                {contact.name}
            </ListGroup.Item>
        ))}
    </ListGroup>
    
  )
}
