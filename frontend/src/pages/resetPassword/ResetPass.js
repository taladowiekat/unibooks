
import { Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resetPasswordValidationSchema } from '../../components/validation/validation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#114b5f',
    },
  },
});

const ResetPassword = () => {
  const initialValues = {
    email: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle reset password logic here
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Reset Password
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="email">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        required
                        error={meta.touched && meta.error}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Reset Password'}
                  </Button>
                  <Box height={20} />

                  <Grid container>
                    <Grid item xs>
                      <Link to='/' variant="body2">
                        Back to login
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

export default ResetPassword;
