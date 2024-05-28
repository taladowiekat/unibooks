import React, { useState, useContext } from 'react';
import { Container, Grid, Paper, Typography, Button, InputAdornment, IconButton, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useValidations } from '../../components/validation/validation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../components/context/UserContext';

const LogIn = () => {
  const navigate = useNavigate();
  const { signInValidationSchema } = useValidations();
  const { setToken, setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    emailOrstudentID: '',
    password: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('http://localhost:4000/auth/signin', {
        identifier: values.emailOrstudentID,
        password: values.password
      });

      Swal.fire({
        icon: 'success',
        title: t('LoginSuccessful'),
        text: t('successfullyLogged'),
        confirmButtonText: t('OKButton'),
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const userResponse = await axios.get('http://localhost:4000/user/getUserProfile', {
        headers: { Authorization: `Token__${data.token}` }
      });

      setUser(userResponse.data.user);
      navigate('/allPosts');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: t('UserNotFound'),
            text: t('emailOrIdNotExist'),
            confirmButtonText: t('OKButton'),
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: t('InvalidCredentials'),
            text: t('passwordIncorrect'),
            confirmButtonText: t('OKButton'),
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: t('LoginFailed'),
          text: t('LoginErrorOccurrd'),
          confirmButtonText: t('OKButton'),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '100px' }} />
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>
            {t("signIn")}
          </Typography>
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
                    <Link to="/forgotPassword" variant="body2">
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
