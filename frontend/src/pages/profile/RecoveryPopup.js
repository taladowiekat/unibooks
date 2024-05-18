// imports
import { TextField, Button, Container, Link, Box, Modal } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useTranslation } from 'react-i18next';
import { useValidations } from '../../components/validation/validation';
import axios from "axios";
import {Navigate} from "react-router-dom";

// function
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

const RecoveryPopup = ({ open, handleClose }) => {
  const {recoveryValidationSchema}=useValidations();
  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (user) => {
    try {
      const { data } = await axios.patch('', {
      });
      if (data.message === "success")
        Navigate('/login');

    }
    catch (error) {
    }
  };

  const {t}=useTranslation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-password-modal"
      aria-describedby="change-password-form"
    >
      <Formik
        validationSchema={recoveryValidationSchema}
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
                  required
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
                  required
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
                  required
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

// export
export default RecoveryPopup;
