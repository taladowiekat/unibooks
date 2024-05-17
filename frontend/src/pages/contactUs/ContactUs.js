import React, { useRef } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useValidations } from '../../components/validation/validation';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
const ContactUs = () => {
    const {contactValidationSchema}=useValidations();
const form = useRef(); 
const {t}=useTranslation();
   
const sendEmail = (values, { resetForm }) => {
    emailjs
    .sendForm('1', '1', form.current, 'FGH6FuDi0f-4TkC4G') 
    .then(
        () => {
            alert(t("contactUsSuccessfullAlert")); 
            resetForm();
        },
        (error) => {
            console.log('Failed to send message:', error.text);
            alert(t("contactUsErrorAlert")); 
        }
    );
};

const initialValues = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
};

return (
    <Container maxWidth="sm">
    <Box sx={{ marginTop: 8, flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
{t("contactUs")}
        </Typography>
        <Typography>
     {t( "contactUsTypography")}
        </Typography>

        <Formik
        initialValues={initialValues}
        validationSchema={contactValidationSchema} 
        onSubmit={sendEmail}
        >
        {({ errors, touched }) => (
            <Form ref={form}>
            <Field
                as={TextField}
                fullWidth
                label={t( "nameOfTheSender")}
                name="name"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label={t( "senderPhoneNumber")}
                name="phoneNumber"
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label={t( "senderEmail")}
                name="email"
                type="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label={t( "senderMessage")}
                name="message"
                multiline
                rows={4}
                error={touched.message && !!errors.message}
                helperText={touched.message && errors.message}
            />
            <Box sx={{ height: '16px' }} />
            <Button
                type="submit"
                variant="contained"
                sx={{ background: 'black', color: 'white' }}
            >
            {t( "sendButton")}
            </Button>
            </Form>
        )}
        </Formik>
    </Box>
    </Container>
);
};

export default ContactUs;