
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import axios from 'axios';
import ResetCode from './ForgotPassword';
import Swal from 'sweetalert2';


const ResetPassword = () => {
  const { resetPasswordValidationSchema } = useValidations();
  const [userEmail, setUserEmail] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    email: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    await axios.patch('http://localhost:4000/auth/forgotPassword', { email: values.email })
      .then((response) => {

        if (response.status === 200) {
          setUserEmail(values.email);
          handleOpen();
        }
      }, (error) => {
        if (error.response) {
          if (error.response.status === 404)
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: 'The provided email is not registered.',
            });
          else
            Swal.fire({
              icon: 'error',
              title: "Oops",
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      })
    setSubmitting(false);
  };

  const { t } = useTranslation();
  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '100px' }} />
        <Paper elevation={3} style={{ padding: 20 }}>

          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>
            {t("resetYourPassword")}
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={resetPasswordValidationSchema}
          >
            {({ errors, touched, isValid, isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  as={TextField}
                  id="email"
                  label={t("email")}
                  autoComplete="email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Box sx={{ height: '30px' }} />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isValid || isSubmitting}
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  {t("resetPassword")}
                </Button>
                <ResetCode open={open} handleClose={handleClose} email={userEmail} />
                <Box height={20} />

                <Grid container>
                  <Grid item xs>
                    <Link to='/login' variant="body2">

                      {t("backToLogin")}
                    </Link>
                  </Grid>
                </Grid>

              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword;
