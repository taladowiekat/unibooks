
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Box,
    Button,
    IconButton,
    Paper,
    Grid,
    Avatar
} from '@mui/material';
import ChangePassword from './ChangePassword.js';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import stringToColor from 'string-to-color';
import { useValidations } from '../../components/validation/validation';


const ProfileForm = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { profileValidationSchema } = useValidations();


    const { t } = useTranslation();
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        college: "",
        email: "",
        image: ""
    });

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:4000/user/getUserProfile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInitialValues(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('college', values.college);
            formData.append('profilePicture', values.image);
            const { data } = await axios.patch('http://localhost:4000/profile/updateProfile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'You have successfully updated your information.',
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: 'Invalid token. Please log in again.',
                    });
                } else if (error.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No Changes',
                        text: 'No changes detected.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'An error occurred while updating the profile. Please try again later.',
                });
            }
        }
    };

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const handleImageUpload = (e, setFieldValue) => {
        const uploadedImage = e.currentTarget.files[0];
        setImage(uploadedImage);
        setFieldValue('image', uploadedImage);
    };

    const handleDeleteImage = (setFieldValue) => {
        setImage(null);
        setFieldValue('image', '');
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={profileValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form>
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ position: 'relative', mb: 4 }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-upload"
                                        name="image"
                                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="image-upload">
                                        <Avatar
                                            sx={{
                                                width: 128,
                                                height: 128,
                                                cursor: 'pointer',
                                                bgcolor: preview ? 'transparent' : stringToColor(values.studentID),
                                                color: '#fff'
                                            }}
                                            src={preview || null}
                                        >
                                            {!preview && getInitial(values.firstName)}
                                        </Avatar>
                                    </label>
                                    {preview && (
                                        <IconButton
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            onClick={() => handleDeleteImage(setFieldValue)}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    )}
                                    {errors.image && touched.image && (
                                        <div style={{ marginTop: 10, color: 'red' }}>
                                            {errors.image}
                                        </div>
                                    )}
                                </Box>

                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    {t("general")}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            margin="normal"
                                            fullWidth
                                            id="firstName"
                                            label={t("firstName")}
                                            name="firstName"
                                            autoComplete="name"
                                            autoFocus
                                            error={touched.firstName && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            margin="normal"
                                            fullWidth
                                            id="lastName"
                                            label={t("lastName")}
                                            name="lastName"
                                            autoComplete="name"
                                            error={touched.lastName && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                </Grid>
                                <Field
                                    name="college"
                                    as={TextField}
                                    select
                                    id="college"
                                    label={t("college")}
                                    fullWidth
                                    SelectProps={{ native: true }}
                                    error={touched.college && Boolean(errors.college)}
                                    helperText={touched.college && errors.college}
                                >

                                    <option value="Faculty of Agriculture and Veterinary Medicine">{t("Faculty of Agriculture and Veterinary Medicine")}</option>
                                    <option value="Faculty of Business and Communication">{t("Faculty of Business and Communication")}</option>
                                    <option value="Faculty of Engineering and Information">{t("Faculty of Engineering and Information")}</option>
                                    <option value="Faculty of Fine Arts">{t("Faculty of Fine Arts")}</option>
                                    <option value="Faculty of Medicine and Health Sciences">{t("Faculty of Medicine and Health Sciences")}</option>
                                    <option value="Faculty of Law and Political Sciences">{t("Faculty of Law and Political Sciences")}</option>
                                    <option value="Faculty of Humanities and Educational Sciences">{t("Faculty of Humanities and Educational Sciences")}</option>
                                    <option value="Faculty of Science">{t("Faculty of Science")}</option>
                                    <option value="Faculty of Shari'ah">{t("Faculty of Shari'ah")}</option>
                                </Field>

                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>
                                    {t("security")}
                                </Typography>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    fullWidth
                                    name="email"
                                    disabled
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
                        </Paper>
                    </Container>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileForm;
