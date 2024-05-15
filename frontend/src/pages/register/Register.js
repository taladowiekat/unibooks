import React, { useState } from 'react';
import { Container, Grid, Typography, Button, InputAdornment, IconButton, TextField, Box,Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
const Register = () => {
  const { signUpValidationSchema } = useValidations()
  const initialValues = {
    universityId: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentPassword: '45688455' //To make it always valid
  };
  const { t } = useTranslation();
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container maxWidth='sm' sx={{ justifyContent: 'center' }}>
      <Box sx={{ marginTop: 8, flexDirection: 'column', textAlign: 'center' }}>
      <Box sx={{ height: '50px' }} />

      <Paper elevation={3} style={{ padding: 20 }}>
              <Typography gutterBottom variant="h6" sx={{ alignItems: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{t("signUp")}</Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={signUpValidationSchema}
        >

          {({ errors, touched, isValid }) => (
            <Form>

              <Field
                name="universityId"
                as={TextField}
                id="universityId"
                label={t("universityId")}
                required
                fullWidth
                error={touched.universityId && Boolean(errors.universityId)}
                helperText={touched.universityId && errors.universityId}
              />

              <Box sx={{ height: '30px' }} />

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

              <Box sx={{ height: '30px' }} />

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
                disabled={!isValid}
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