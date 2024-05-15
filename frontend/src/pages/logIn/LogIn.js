import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, InputAdornment, IconButton, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useValidations } from '../../components/validation/validation';
import { useTranslation } from 'react-i18next';
const LogIn = () => {
  const {signInValidationSchema}=useValidations();
  const initialValues = {
    emailOrUniversityId: '',
    password: ''
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    setSubmitting(false);
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const {t}=useTranslation();
  return (
    <Container maxWidth='sm'sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
        <Box sx={{ height: '100px' }} />
        <Paper elevation={3} style={{ padding: 20 }}>

        <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{t("signIn")} </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={signInValidationSchema}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <Field
                name="emailOrUniversityId"
                as={TextField}
                id="emailOrUniversityId"
                label={t("EmailOrUniversityID")}
                autoComplete="email"
                type="email"
                required
                fullWidth
                error={touched.emailOrUniversityId && Boolean(errors.emailOrUniversityId)}
                helperText={touched.emailOrUniversityId && errors.emailOrUniversityId}
              />
              <Box sx={{ height: '30px' }} />
              <Field
                name="password"
                as={TextField}
                id="password"
                label={t("Password")}
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

              <Box sx={{ height: '30px' }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: 20 }}
                component={Link}
                to="/createPost"
                disabled={!isValid}
              >
                {t("loginButton")}
              </Button>
              <Box height={20} />

              <Grid container  spacing={2} style={{ padding: 4 }}>

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