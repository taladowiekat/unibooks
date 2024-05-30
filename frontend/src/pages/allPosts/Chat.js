import { TextField, Container, Modal, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React from 'react';
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

const Chats = ({ open, handleClose, email}) => {
    const { t } = useTranslation();

    

    const handleSubmit = (values) => {
        const subject = encodeURIComponent(values.senderName);
        const body = encodeURIComponent(values.message);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Formik initialValues={{ senderName: '', message: '' }} onSubmit={handleSubmit}>
                <Form>
                    <Container style={modalStyle}>
                        <h1>{t('SendEmail')}</h1>
                        <Field as={TextField} name="senderName" label={t('senderName')} fullWidth required />
                        <Field as={TextField} name="message" label={t('Message')} fullWidth required />
                        <Button type="submit">{t('SendEmail2')}</Button>
                    </Container>
                </Form>
            </Formik>
        </Modal>
    );
};

export default Chats;
