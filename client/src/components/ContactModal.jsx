import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
// import { useConversations } from '../contexts/ConversationsProvider'

export default function ContactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const {createContact} = useContacts();

    function handleSubmit(e) {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeModal();
    }


    return (
        <>
            <Modal.Header className='Modal-body' closeButton>Create contact</Modal.Header>
            <Modal.Body className='Modal-body'>
                <Form onSubmit={handleSubmit} >
                <Form.Group className="form_group-1">
                    <Form.Label className="form_label-1">Enter Id</Form.Label>
                    <Form.Control className="form__input-1" type="text" placeholder="eg: 12345afe" ref={idRef} required/>
                </Form.Group>
                <Form.Group className="form_group-1">
                    <Form.Label className="form_label-1">Enter Name</Form.Label>
                    <Form.Control className="form__input-1" type="text" placeholder="eg: Abc" ref={nameRef} required/>
                </Form.Group>
                <Button type="submit" className="mt-2 Modal-button yes">Create</Button> 
                </Form>
            </Modal.Body>
        </>
    )
}