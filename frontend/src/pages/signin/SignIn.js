import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, InputAdornment, IconButton, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useValidations } from '../../components/validation/validation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LogIn = () => {

  const navigate = useNavigate();

  const { signInValidationSchema } = useValidations();

  const initialValues = {
    emailOrstudentID: '',
    password: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('http://localhost:4000/auth/signin', {
        identifier: values.emailOrstudentID,
        password: values.password
      }); Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in.',
      });
      localStorage.setItem("userToken", data.token);
      navigate('/allPosts');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'User not found',
            text: 'The provided email or student ID does not exist.',
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid credentials',
            text: 'The provided password is incorrect.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'An error occurred during login. Please try again later.',
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '100px' }} />
        <Paper elevation={3} style={{ padding: 20 }}>

          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{t("signIn")} </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signInValidationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="emailOrstudentID"
                  as={TextField}
                  id="emailOrstudentID"
                  label={t("EmailOrstudentID")}
                  autoComplete="email"

                  fullWidth
                  error={touched.emailOrstudentID && Boolean(errors.emailOrstudentID)}
                  helperText={touched.emailOrstudentID && errors.emailOrstudentID}
                />
                <Box sx={{ height: '30px' }} />
                <Field
                  name="password"
                  as={TextField}
                  id="password"
                  label={t("Password")}
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}

                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} color='primary'>
                          {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
                        </IconButton>
                      </InputAdornment>
                    )

                  }}
                />

                <Box sx={{ height: '30px' }} />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: 20 }}
                >
                  {t("loginButton")}
                </Button>
                <Box height={20} />

                <Grid container spacing={2} style={{ padding: 4 }}>

                  <Grid item xs={5.5}>
                    <Link to="/resetPass" variant="body2">
                      {t("forgotPassword")}
                    </Link>
                  </Grid>

                  <Grid item xs={6}>
                    <Link to="/register" variant="body2">
                      {t("loginSubTextOne")}
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

export default LogIn;