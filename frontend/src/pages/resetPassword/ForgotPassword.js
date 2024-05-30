
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import axios from 'axios';
import Swal from 'sweetalert2';
import ResetPassword from './ResetPass';


const ForgotPassword = () => {
  const { forgotPasswordValidationSchema } = useValidations();
  const [userEmail, setUserEmail] = useState('');
  const { t } = useTranslation();
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
              title: t('UserNotFound'),
              text: t('notregistered'),
            });
          else
            Swal.fire({
              icon: 'error',
              title: t('Oops'),
              text: t('unexpectedError'),
            });
        }
      })
    setSubmitting(false);
  };

 
  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '120px' }} />
        <Paper elevation={3} style={{ padding: 20 }}>

          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>
            {t("resetYourPassword")}
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={forgotPasswordValidationSchema}
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
                <ResetPassword open={open} handleClose={handleClose} email={userEmail} />
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
        <Box sx={{ height: '180px' }} />

      </Box>
    </Container>
  );
};

export default ForgotPassword;
