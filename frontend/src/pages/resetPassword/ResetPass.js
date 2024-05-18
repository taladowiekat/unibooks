
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import axios from 'axios';
import ResetCode from './ForgotPassword';


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
    try {
      const { data } = await axios.patch('http://localhost:4000/auth/forgotPassword', { email: values.email });
      console.log(data);

      if (data.message === "success") {
        setUserEmail(values.email);
        handleOpen();
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSubmitting(false);
    }
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
