import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, InputAdornment, IconButton, Checkbox, TextField, FormControlLabel,Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInValidationSchema } from '../../components/web/validation/validation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#114b5f', 
    },
  },
});

const SignIn = () => {
  const initialValues = {
    emailOrUniversityId: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle SignIn logic here
    setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
            Sign In
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={signInValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="emailOrUniversityId">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        id="emailOrUniversityId"
                        label="Email or University ID"
                        autoComplete="email"
                        autoFocus
                        required
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
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
                    )}
                  </Field>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              style={{ marginTop: 20 }}
              component={Link}
              to="/createPost" 
            >
              Login
            </Button>
                  <Box height={20} />

                  <Grid container>
                    <Grid item xs>
                      <Link to="/resetPass" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signUp" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
