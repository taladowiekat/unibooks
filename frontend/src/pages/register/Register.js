import React, { useState } from 'react';
import { Avatar, Container, Grid, Typography, Button, InputAdornment, IconButton, TextField, Box, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const { signUpValidationSchema } = useValidations();
  const initialValues = {
    firstname: '',
    lastname: '',
    studentID: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { t } = useTranslation();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('http://localhost:4000/auth/signup', {
        firstname: values.firstname,
        lastname: values.lastname,
        studentID: values.studentID,
        email: values.email,
        password: values.password,
        gender: values.gender,
        college: values.college
      });
      console.log(data);
      navigate('/login')
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };


  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '30px' }} />

        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{t("signUp")}</Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signUpValidationSchema}
          >
            {({ errors, touched, isValid, setFieldValue }) => (
              <Form>

                <label htmlFor="upload-avatar">
                  <Avatar
                    alt=""
                    src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                    sx={{ width: 100, height: 100, margin: 'auto' }}
                  />
                </label>
                <input
                  id="upload-avatar"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(event) => {
                    handleImageChange(event);
                    setFieldValue('image', event.currentTarget.files[0]);

                  }}
                />


                {errors.image && touched.image && (
                  <div style={{ color: 'red' }}>{errors.image}</div>
                )}
                <Box sx={{ height: '10px' }} />


                <Grid container spacing={2}>
                <Grid item xs={6}>
                <Field
                  name="firstname"
                  as={TextField}
                  id="firstname"
                  label={t("firstname")}
                  required
                  fullWidth
                  error={touched.firstname && Boolean(errors.firstname)}
                  helperText={touched.firstname && errors.firstname}
                />
                </Grid>
                <Grid item xs={6}>
                <Field
                  name="lastname"
                  as={TextField}
                  id="lastname"
                  label={t("lastname")}
                  required
                  fullWidth
                  error={touched.lastname && Boolean(errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
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
                  required
                  fullWidth
                  SelectProps={{ native: true }}
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
                  required
                  fullWidth
                  SelectProps={{ native: true }}
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
                  required
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
                  required
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
                  required
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
                  required
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