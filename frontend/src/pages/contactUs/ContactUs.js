import React, { useState } from 'react';
import {
Container,
Typography,
TextField,
Box,
Button,
} from '@mui/material';

const ContactUs = () => {
const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
});

const [phoneError, setPhoneError] = useState('');

const validatePhone = (phoneNumber) => {
    const phonePattern = /^(05[02469]\d{7})$/; 
    return phonePattern.test(phoneNumber);
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));

    if (name === 'phoneNumber' && !validatePhone(value)) {
    setPhoneError('Invalid phone number');
    } else {
    setPhoneError('');
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePhone(formData.phoneNumber)) {
    setPhoneError('Invalid phone number');
    return;
    }
    
    setPhoneError('');
    console.log(formData);
};

return (
    <Container maxWidth="sm">
    <Box sx={{ marginTop: 8,  flexDirection: 'column'}}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
        Contact Us
        </Typography>
        <Typography  >
        If you encounter any problems or have suggestions, please feel free to contact us.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
        <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!phoneError}
            helperText={phoneError}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
        />
        <Button
            type="submit"
            sx={{ mt: 2, background: "black", color: "white" }}
        >
            Send
        </Button>
        </Box>
    </Box>
    </Container>
);
};

export default ContactUs;
