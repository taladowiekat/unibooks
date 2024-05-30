import { TextField, Button, Container, Box, Modal, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useValidations } from "../../components/validation/validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const onSubmit = async (values, { setSubmitting }) => {

    await axios.patch(`http://localhost:4000/auth/resetPassword`, { ...values, email })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: t('PasswordChanged'),
            text: t('changeSuccsAlart'),
          });
          navigate('/login');
        }
      }, (error) => {
        if (error.response.status === 400)
          Swal.fire({
            icon: 'error',
            text: t('SamePassAlart'),
          });
        else if (error.response.status === 401)
          Swal.fire({
            icon: 'error',
            title: t('InvalidCode'),
            text: t('codeIncorrect'),
          });
        else
          Swal.fire({
            icon: 'error',
            title: t('Oops'),
            text: t('unexpectedError'),
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
      <>
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
                    {t('checkCode')}
                  </Typography>
                  <Field
                    name="code"
                    as={TextField}
                    id="code"
                    label={t('resetCode')}
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
                    label={t('newPassword')}
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
                    label={t("confirmPassword")}
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
                      {t('cancelbutton')}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {t('confirmButton')}
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
};

export default ResetPassword;