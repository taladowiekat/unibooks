// imports
import { TextField, Container, Modal, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// function
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper", 
    boxShadow: 24,
    p: 4,
    outline: "none",
    backgroundColor: "#f0f0f0",  
};

const Chats = ({ studentID, open, handleClose }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/email/${studentID}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Failed to fetch user:', error));
    }, [studentID]);

    const handleSubmit = (values) => {
        window.open(`mailto:${user.email}?subject=${encodeURIComponent(values.name)}&body=${encodeURIComponent(values.message)}`);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Formik initialValues={{ name: '', message: '' }} onSubmit={handleSubmit}>
                <Form>
                    <Container style={modalStyle}>
                        <h1>Send Email</h1>
                        <Field as={TextField} name="sender name" label="Sender Name" fullWidth required />
                        <Field as={TextField} name="message" label="Message" fullWidth required />
                        <Button type="submit">Send Email</Button>
                    </Container>
                </Form>
            </Formik>
        </Modal>
    );
};

export default Chats;
