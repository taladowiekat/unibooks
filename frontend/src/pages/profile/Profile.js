import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Box,
    Button,
    Paper,
    Avatar,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import userImage from './profilepic.png';
import RecoveryPopup from '../../components/web/profile/RecoveryPopup';


const ProfileForm = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper sx={{ position: 'relative', width: 'fit-content', p: 2, mb: 4 }}>
                    <Avatar src={userImage} sx={{ width: 120, height: 120 }} />
                    <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} size="small">
                        <EditIcon />
                    </IconButton>
                </Paper>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    General
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="college"
                    label="College Name"
                    name="college"
                    autoComplete="college"
                />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>
                    Security
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={handleOpen}
                >
                    Change Password
                </Button>

                <RecoveryPopup open={open} handleClose={handleClose} />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 1 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>


        </Container>
    );
};

export default ProfileForm;

