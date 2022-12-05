import React, { useRef } from "react";
import {v4 as uuid} from 'uuid';
//components
import { Container, Form,Button } from "react-bootstrap";

//css
// import "./index-login.css";
import "./Styles/Login/login.css";
// import "./Styles/login.css";

export default function Login({id}) {
    
    const idref = useRef();
    function handleSubmit(e){
        e.preventDefault();
        id(idref.current.value);
    }

    function createNewid(){
        id(uuid());
    }

    return (
        <Container className="contain">
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="form_group">
                    <Form.Label className="form_label">Enter Id</Form.Label>
                    <Form.Control type="text" placeholder="eg: 12345afe" ref={idref} className="form__input" required />
                    
                </Form.Group>
                <div className="w-100 button-container">
                <Button type="submit" className="btn__primary">Login</Button>
                <Button onClick={createNewid} className="btn__secondary  m-2">Create new Id</Button>
                </div>
            </Form>
        </Container>
    );
}
