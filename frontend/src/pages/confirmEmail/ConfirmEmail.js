import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Container, Typography } from '@mui/material';

const ConfirmEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/auth/confirmEmail/${token}`)
            .then(() => {
                alert('Email confirmed successfully!');
                navigate('/login');
            })
            .catch(() => {
                alert('Failed to confirm email.');
                navigate('/login');
            });
    }, [token, navigate]);

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px', textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="h5">Confirming your email...</Typography>
        </Container>
    );
};

export default ConfirmEmail;