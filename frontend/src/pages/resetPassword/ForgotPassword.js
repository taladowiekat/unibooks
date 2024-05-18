import { TextField, Button, Container, Box, Modal, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useValidations } from "../../components/validation/validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const ForgotPassword = ({ open, handleClose, email }) => {
  const { forgotPasswordValidationSchema } = useValidations();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    code: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.patch(`http://localhost:4000/auth/resetPassword`, { ...values, email });

      if (data.message === "success") {
        navigate('/login');
      }
    } catch (error) {
      // TODO change to toast or something nicer idk
      alert(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="reset-code-modal"
      aria-describedby="reset-code-form"
    >
      <Formik
        validationSchema={forgotPasswordValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
                  variant="filled"
                  type="text"
                  fullWidth
                  required
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
                  required
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
                  required
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

export default ForgotPassword;