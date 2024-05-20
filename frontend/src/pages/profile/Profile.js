import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Box,
    Button,
    Paper,
    Avatar,
    IconButton,
    InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import userImage from './profilepic.png';
import ChangePassword from './ChangePassword.js';
import { Field, Form, Formik } from 'formik';
import { useValidations } from '../../components/validation/validation';
import { useTranslation } from 'react-i18next';

const ProfileForm = ( ) => {
    const {signUpValidationSchema}=useValidations()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const {t}=useTranslation();
    const initialValues = {
        // connect with database to get student's info
        name: "",
        college: "",
        email: "",
        password: "",
    };

    const handleSubmit = () => {
        // if password matches with user, change info in database
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signUpValidationSchema}
        >
            {({ errors, touched, isSubmitting }) => (

                <Form>

                    <Container maxWidth="sm">
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Paper sx={{ position: 'relative', width: 'fit-content', p: 2, mb: 4 }}>
                                <Avatar src={userImage} sx={{ width: 120, height: 120 }} />
                                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} size="small">
                                    <EditIcon />
                                </IconButton>
                            </Paper>

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                {t("general")}
                            </Typography>
                            <Field
                                as={TextField}
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label={t("userName")}
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <Field
                                as={TextField}
                                margin="normal"
                                required
                                fullWidth
                                id="college"
                                label={t("college")}
                                name="college"
                                autoComplete="college"
                            />

                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>
                                {t("security")}
                            </Typography>
                            <Field
                                as={TextField}
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label={t("email")}
                                type="email"
                                id="email"
                                autoComplete="email"

                                error={
                                    touched.email && Boolean(errors.email)
                                }
                                helperText={
                                    touched.email ? errors.email : ""
                                }
                            />
                            <Field
                                as={TextField}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t("password")}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} color='primary'>
                                                {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}

                                error={
                                    touched.password && Boolean(errors.password)
                                }
                                helperText={
                                    touched.password ? errors.password : ""
                                }
                            />

                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 2 }}
                                onClick={handleOpen}
                            >
                               {t("changePassword")}
                            </Button>

                            <ChangePassword open={open} handleClose={handleClose} />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                >
                                {t("saveButton")}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ ml: 1 }}
                                >
                                    {t("cancelbutton")}
                                </Button>
                            </Box>
                        </Box>


                    </Container>

                </Form>
            )}
        </Formik>
    );
};

export default ProfileForm;