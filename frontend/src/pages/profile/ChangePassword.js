import { Modal, TextField, Button, Container, Box, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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

const ChangePassword = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const { changePasswordValidationSchema } = useValidations();
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (user, { setSubmitting }) => {

    const token = localStorage.getItem("userToken");

    await axios.patch('http://localhost:4000/auth/changePassword', {
      currentPassword: user.currentPassword,
      newPassword: user.newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200)
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'Your password has been changed successfully.',
        });
    }, (error) => {
      if (error.response.status === 400)
        Swal.fire({
          icon: 'error',
          text: 'New Password is identical to Current Password.',
        });
      else if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Token Expired',
          text: 'Your Token has expired. Please log in again.',
        });
        navigate('/login');
      }
      else if (error.response.status === 405)
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Password',
          text: 'The current password provided is incorrect.',
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

  const { t } = useTranslation();

  return (
    <Modal
      sx={{ zIndex: 1050 }} // SweetAlert Z-Index is 1060. this is needed for alert to be on top
      open={open}
      onClose={handleClose}
      aria-labelledby="change-password-modal"
      aria-describedby="change-password-form"
    >
      <Formik
        validationSchema={changePasswordValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Container sx={modalStyle}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  name="currentPassword"
                  as={TextField}
                  id="currentPassword"
                  label={t("currentPassword")}
                  variant="filled"
                  type="password"
                  fullWidth

                  disabled={isSubmitting}
                  error={
                    touched.currentPassword && Boolean(errors.currentPassword)
                  }
                  helperText={
                    touched.currentPassword ? errors.currentPassword : ""
                  }
                />
                <Field
                  name="newPassword"
                  as={TextField}
                  id="newPassword"
                  label={t("newPassword")}
                  variant="outlined"
                  type="password"
                  fullWidth

                  disabled={isSubmitting}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword ? errors.newPassword : ""}
                />
                <Field
                  name="confirmPassword"
                  as={TextField}
                  id="confirmPassword"
                  label={t("confirmPassword")}
                  variant="outlined"
                  type="password"
                  fullWidth

                  disabled={isSubmitting}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : ""
                  }
                />
                <Link href="#" underline="none">
                  {t("forgotPassword")}
                </Link>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                  >
                    {t("cancelbutton")}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t("confirmButton")}
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

export default ChangePassword;