import React,{ useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'
// import useLocalStorage from '../hooks/useLocalStorage'

import DoneIcon from '@material-ui/icons/Done';
export default function ConversationsModal({ closeModal}) {

    const [selectedContactIds,setSelectedContactIds] = useState([]);
    const {contacts} = useContacts();
    const {createConversations} = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        createConversations(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId =>{
                    return contactId !== prevId;
                })
    }else{
        return [...prevSelectedContactIds,contactId]
    }
})
}


    return (
        <>
        <Modal.Header className='Modal-body' closeButton>Create Conversations</Modal.Header>
            <Modal.Body className='Modal-body'>
            <Form onSubmit={handleSubmit}>
            {contacts.map(contact => (
                <Form.Group key={contact.id} className='form-group'>
                    <Form.Check
                    id={contact.id}
                    className='checkbox__1'
                    type="checkbox"
                    value={selectedContactIds.includes(contact.id)}
                    label={<DoneIcon className="icon"/>}
                    onChange={() =>  handleCheckboxChange(contact.id)}
                /><div className='label-custom'>{contact.name}</div>
                </Form.Group>

            ))}
            <Button type="submit" className="mt-2 Modal-button yes">Add Conversations</Button> 
            </Form>
            
        </Modal.Body>
    </>
    )
}
