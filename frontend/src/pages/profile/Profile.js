import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Box,
    Button,
    Paper,
    IconButton,
    ButtonBase,
    Grid
} from '@mui/material';
import userImage from './profilepic.png';
import { styled } from '@mui/material/styles';
import ChangePassword from './ChangePassword.js';
import { Field, Form, Formik } from 'formik';
import { useValidations } from '../../components/validation/validation';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@mui/icons-material';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const ProfileForm = () => {
    const { profileValidationSchema } = useValidations()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
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

    const onSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('bookName', values.bookName);
        formData.append('notes', values.notes);
        formData.append('listingType', values.listingType);
        formData.append('image', values.image);
        formData.append('exchangeBookName', values.exchangeBookName);
        resetForm();
        setImage(null);
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={profileValidationSchema}
        >

            {({ setFieldValue, errors, touched, values, isValid, handleChange, handleBlur }) => (

                <Form>
                    <Container maxWidth="sm">
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Paper sx={{ position: 'relative', width: 300, p: 2, mb: 4 }}>
                                {!image && (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image-upload"
                                            name="image"
                                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="image-upload">

                                            <ImageButton
                                                focusRipple
                                                component="span"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <ImageSrc style={{ backgroundImage: `url(${preview || '/static/images/default.png'})` }} />
                                                <ImageBackdrop className="MuiImageBackdrop-root" />
                                                <Image src={userImage}>
                                                    <Typography
                                                        component="span"
                                                        variant="subtitle1"
                                                        color="inherit"
                                                        sx={{
                                                            position: 'relative',
                                                            p: 4,
                                                            pt: 2,
                                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                        }}
                                                    >
                                                        {t("uploadImage")}
                                                        <ImageMarked className="MuiImageMarked-root" />
                                                    </Typography>
                                                </Image>
                                            </ImageButton>
                                        </label>
                                        {errors.image && touched.image && (
                                            <div style={{ marginTop: 10, color: 'red' }}>
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {preview && (
                                    <>
                                        <img src={preview} alt="Uploaded" style={{ width: '100%', height: 'auto', borderRadius: 10 }} />                                        <IconButton
                                            style={{ position: 'absolute', top: 0, right: -30 }}
                                            onClick={() => handleDeleteImage(setFieldValue)}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    </>
                                )}
                            </Paper>

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
                                        autoFocus
                                    />
                                </Grid>
                            </Grid>
                            <Field
                                as={TextField}
                                margin="normal"
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


                    </Container>

                </Form>
            )}
        </Formik>
    );
};

export default ProfileForm;