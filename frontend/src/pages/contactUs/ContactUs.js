import React, { useRef } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { contactValidation } from '../../components/validation/validation.js';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
const form = useRef(); 

const sendEmail = (values, { resetForm }) => {
    emailjs
    .sendForm('1', '1', form.current, 'FGH6FuDi0f-4TkC4G') 
    .then(
        () => {
        alert("Your message has been sent successfully!"); 
        resetForm();
        },
        (error) => {
        console.log('Failed to send message:', error.text);
        alert("There was an error sending your message. Please try again later."); 
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
        Contact Us
        </Typography>
        <Typography>
        If you encounter any problems or have suggestions, please feel free to contact us.
        </Typography>

        <Formik
        initialValues={initialValues}
        validationSchema={contactValidation} 
        onSubmit={sendEmail}
        >
        {({ errors, touched }) => (
            <Form ref={form}>
            <Field
                as={TextField}
                fullWidth
                label="Name"
                name="name"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                type="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
            />
            <Box sx={{ height: '16px' }} />
            <Field
                as={TextField}
                fullWidth
                label="Message"
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
                Send
            </Button>
            </Form>
        )}
        </Formik>
    </Box>
    </Container>
);
};

export default ContactUs;
