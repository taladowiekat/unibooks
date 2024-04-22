// imports
import { TextField, Button, Container, Link, Box, Modal } from "@mui/material";

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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-password-modal"
      aria-describedby="change-password-form"
    >
      <Container sx={modalStyle}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <TextField
              id="outlined-basic"
              label="Current Password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <Link href="#" underline="none">
              Forgot Password?
            </Link>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

// export
export default RecoveryPopup;
