import React from 'react';
import { Modal, TextField, Button, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

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

const Chats = ({ open, handleClose, email, studentID }) => {
    const { t } = useTranslation();

    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:4000/message/save-message', {
                senderName: values.senderName,
                message: values.message,
                email: values.email,
                recevieEmail: email,
                studentID
            });

            const subject = encodeURIComponent(values.senderName);
            const body = encodeURIComponent(values.message);
            window.open(`mailto:${email}?subject=${subject}&body=${body}`);
            handleClose();
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Container style={modalStyle}>
                <Formik initialValues={{ senderName: '', message: '' }} onSubmit={handleSubmit}>
                    <Form>
                        <h1>{t('SendEmail')}</h1>
                        <Field as={TextField} name="senderName" label={t('senderName')} fullWidth required />
                        <Field as={TextField} name="message" label={t('Message')} fullWidth required />
                        <Button type="submit">{t('SendEmail2')}</Button>
                    </Form>
                </Formik>
            </Container>
        </Modal>
    );
};

export default Chats;
