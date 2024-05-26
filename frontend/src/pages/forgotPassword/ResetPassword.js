import { TextField, Button, Container, Box, Modal, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useValidations } from "../../components/validation/validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none"

};

const ResetPassword = ({ open, handleClose, email }) => {
  const { resetPasswordValidationSchema } = useValidations();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    code: '',
    password: ''
  };

  const onSubmit = async (values, { setSubmitting }) => {

    await axios.patch(`http://localhost:4000/auth/resetPassword`, { ...values, email })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Password Changed',
            text: 'Your password has been changed successfully.',
          });
          navigate('/login');
        }
      }, (error) => {
        if (error.response.status === 400)
          Swal.fire({
            icon: 'error',
            text: 'New Password cannot be the same as the old password.',
          });
        else if (error.response.status === 401)
          Swal.fire({
            icon: 'error',
            title: 'Invalid Code',
            text: 'The provided code is incorrect.',
          });
        else
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'An unexpected error occurred. Please try again later.',
          });
      })
      setSubmitting(false);
  }

  return (
    <Modal
      sx={{ zIndex: 1050 }} // SweetAlert Z-Index is 1060. this is needed for alert to be on top
      open={open}
      onClose={handleClose}
      aria-labelledby="reset-code-modal"
      aria-describedby="reset-code-form"
    >
      <Formik
        validationSchema={resetPasswordValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Container sx={modalStyle}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography gutterBottom sx={{ alignItems: 'center', fontSize: '1.2rem' }}>
                  Please check your email for a message with your code.
                </Typography>
                <Field
                  name="code"
                  as={TextField}
                  id="code"
                  label="Reset Code"
                  variant="outlined"
                  type="text"
                  sx={{ width: '4cm' }}
                  fullWidth

                  disabled={isSubmitting}
                  inputProps={{ maxLength: 4 }}
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code ? errors.code : ""}
                />
                <Field
                  name="password"
                  as={TextField}
                  id="password"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth

                  disabled={isSubmitting}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password ? errors.password : ""}
                />
                <Field
                  name="confirmPassword"
                  as={TextField}
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth

                  disabled={isSubmitting}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                />
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;