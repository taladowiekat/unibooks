import { TextField, Container, Modal, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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

const Chats = ({ messageId, open, handleClose }) => {
    const [email, setEmail] = useState('');
    const {t}=useTranslation();
    useEffect(() => {
        axios.get(`http://localhost:4000/auth/message/${messageId}`)
            .then(response => setEmail(response.data.user.email))
            .catch(error => console.error('Failed to fetch message:', error));
    }, [messageId]);

    const handleSubmit = (values) => {
        window.open(`mailto:${email}?subject=${encodeURIComponent(values.name)}&body=${encodeURIComponent(values.message)}`);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Formik initialValues={{ name: '', message: '' }} onSubmit={handleSubmit}>
                <Form>
                    <Container style={modalStyle}>
                        <h1>{t('SendEmail')}</h1>
                        <Field as={TextField} name="name" label={t('nameOfTheSender')}fullWidth required />
                        <Field as={TextField} name="message" label={t('Message')} fullWidth required />
                        <Button type="submit">{t('SendEmail2')}</Button>
                    </Container>
                </Form>
            </Formik>
        </Modal>
    );
};

export default Chats;