import React, { useState } from 'react';
import { Container, Grid, Typography, Button, InputAdornment, IconButton, TextField, Box, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const { signUpValidationSchema } = useValidations();
  const initialValues = {
    firstName: '',
    lastName: '',
    studentID: '',
    email: '',
    password: '',
    college: '',
    gender: '',
    confirmPassword: '',
    image: null
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useTranslation();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('http://localhost:4000/auth/signup', {
        firstName: values.firstName,
        lastName: values.lastName,
        studentID: values.studentID,
        email: values.email,
        password: values.password,
        gender: values.gender,
        college: values.college,
        confirmPassword: values.confirmPassword
      });
      Swal.fire({
        title: t('signUp Success'),
        text: t('You are now part of the unibooks community'),
        icon: 'success',
        confirmButtonText: t('tap to signin'),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: t('signUp Error'),
          text: t('User already registered. Please log in.'),
          icon: 'error',
          confirmButtonText: t('OK'),
        });
      } else {
        console.log(error)
        Swal.fire({
          title: t('signUp Error'),
          text: t('An error occurred during registration. Please try again.'),
          icon: 'error',
          confirmButtonText: t('OK'),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '30px' }} />

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{t("signUp")}</Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signUpValidationSchema}
          >
            {({ errors, touched }) => (
              <Form>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="firstName"
                      as={TextField}
                      id="firstName"
                      label={t("firstname")}
                      fullWidth
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="lastName"
                      as={TextField}
                      id="lastName"
                      label={t("last  ame")}

                      fullWidth
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ height: '10px' }} />

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      name="gender"
                      as={TextField}
                      select
                      id="gender"
                      label={t("gender")}
                      fullWidth
                      SelectProps={{ native: true }}
                      error={touched.gender && Boolean(errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <option value=""></option>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </Field>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      name="college"
                      as={TextField}
                      select
                      id="college"
                      label={t("college")}

                      fullWidth
                      SelectProps={{ native: true }}
                      error={touched.college && Boolean(errors.college)}
                      helperText={touched.college && errors.college}
                    >
                      <option value=""></option>
                      <option value="Faculty of Agriculture and Veterinary Medicine">{t("Faculty of Agriculture and Veterinary Medicine")}</option>
                      <option value="Faculty of Business and Communication">{t("Faculty of Business and Communication")}</option>
                      <option value="Faculty of Engineering and Information">{t("Faculty of Engineering and Information")}</option>
                      <option value="Faculty of Fine Arts">{t("Faculty of Fine Arts")}</option>
                      <option value="Faculty of Medicine and Health Sciences">{t("Faculty of Medicine and Health Sciences")}</option>
                      <option value="Faculty of Law and Political Sciences">{t("Faculty of Law and Political Sciences")}</option>
                      <option value="Faculty of Humanities and Educational Sciences">{t("Faculty of Humanities and Educational Sciences")}</option>
                      <option value="Faculty of Science">{t("Faculty of Science")}</option>
                      <option value="Faculty of Shari'ah">{t("Faculty of Shari'ah")}</option>
                    </Field>
                  </Grid>
                </Grid>
                <Box sx={{ height: '10px' }} />

                <Field
                  name="studentID"
                  as={TextField}
                  id="studentID"
                  label={t("studentID")}
                  fullWidth
                  error={touched.studentID && Boolean(errors.studentID)}
                  helperText={touched.studentID && errors.studentID}
                />
                <Box sx={{ height: '10px' }} />

                <Field
                  name="email"
                  as={TextField}
                  id="email"
                  label={t("email")}
                  autoComplete="email"
                  type="email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Box sx={{ height: '10px' }} />

                <Field
                  name="password"
                  as={TextField}
                  id="password"
                  label={t("password")}
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
                <Box sx={{ height: '10px' }} />

                <Field
                  name="confirmPassword"
                  as={TextField}
                  id="confirmPassword"
                  label={t("confirmPassword")}
                  autoComplete="new-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} color='primary'>
                          {showConfirmPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}

                >
                  {t("createAccount")}
                </Button>

                <Box height={20} />

                <Grid container>
                  <Grid item>
                    <Link to="/LogIn" variant="body2">
                      {t("signUpSubTextOne")}
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

export default Register;