
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, InputAdornment, IconButton, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { resetPasswordValidationSchema } from '../../components/validation/validation';



const ResetPassword = () => {
  const initialValues = {
    email: '',
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    setSubmitting(false);
  };

  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '100px' }} />

        <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}> Reset your password </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={resetPasswordValidationSchema}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <Field
                name="email"
                as={TextField}
                id="email"
                label="Email"
                autoComplete="email"
                type="email"
                required
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Box sx={{ height: '30px' }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isValid}
                color="primary"
                sx={{ mt: 2 }}
              >
                Reset Password
              </Button>
              <Box height={20} />

              <Grid container>
                <Grid item xs>
                  <Link to='/login' variant="body2">
                    Back to login
                  </Link>
                </Grid>
              </Grid>

            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ResetPassword;
