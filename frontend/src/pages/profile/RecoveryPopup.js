// imports
import { TextField, Button, Container, Link, Box, Modal } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { recoveryPopupValidationSchema } from "../../components/validation/validation";

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
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = () => {
    // if current password matches with user, change password in database
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-password-modal"
      aria-describedby="change-password-form"
    >
      <Formik
        validationSchema={recoveryPopupValidationSchema}
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
                  label="Current Password"
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
                  label="New Password"
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
                  label="Confirm Password"
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
                  Forgot Password?
                </Link>
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

// export
export default RecoveryPopup;
