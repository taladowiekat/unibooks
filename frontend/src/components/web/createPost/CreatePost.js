import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { ButtonBase, Paper, Typography, Button, Box, Dialog, IconButton, RadioGroup, FormControlLabel, Radio, TextField, FormControl, FormLabel } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useValidations } from '../../validation/validation.js';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext.js';
import Swal from 'sweetalert2';

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

const CreateListing = ({ open, handleClose, onPostCreated }) => {
  const { createPostValidationSchema } = useValidations();
  const { t } = useTranslation();
  const { token } = useContext(UserContext);

  const [mainImage, setMainImage] = useState();
  const [mainPreview, setMainPreview] = useState();
  const [subImages, setSubImages] = useState([]);
  const [subPreviews, setSubPreviews] = useState([]);

  useEffect(() => {
    if (!mainImage) {
      setMainPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(mainImage);
    setMainPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [mainImage]);

  useEffect(() => {
    const newPreviews = subImages.map(image => URL.createObjectURL(image));
    setSubPreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [subImages]);

  const handleMainImageUpload = (e, setFieldValue) => {
    const uploadedImage = e.currentTarget.files[0];
    setMainImage(uploadedImage);
    setFieldValue('image', uploadedImage);
  };

  const handleSubImagesUpload = (e, setFieldValue) => {
    const uploadedImages = Array.from(e.currentTarget.files);
    if (subImages.length + uploadedImages.length <= 4) {
      const newSubImages = [...subImages, ...uploadedImages];
      setSubImages(newSubImages);
      setFieldValue('subImages', newSubImages);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can upload up to 4 sub-images only.',
      });
    }
  };

  const handleDeleteMainImage = (setFieldValue) => {
    setMainImage(null);
    setFieldValue('image', '');
  };

  const handleDeleteSubImage = (index, setFieldValue) => {
    const newSubImages = subImages.filter((_, i) => i !== index);
    setSubImages(newSubImages);
    setFieldValue('subImages', newSubImages);
  };

  const initialValues = {
    bookName: '',
    notes: '',
    postType: 'Sell',
    image: '',
    subImages: [],
    exchangeBookName: ''
  };

  const onSubmit = async (values, { resetForm }, setSubmitting) => {
    const formData = new FormData();
    formData.append('bookName', values.bookName);
    formData.append('notes', values.notes);
    formData.append('postType', values.postType);
    formData.append('mainImage', values.image);
    values.subImages.forEach((image, index) => {
      formData.append('subImages', image);
    });
    formData.append('exchangeBookName', values.exchangeBookName);

    try {
      const response = await axios.post('http://localhost:4000/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token__${token}`
        }
      });
      console.log(response.data);
      resetForm();
      setMainImage(null);
      setSubImages([]);
      handleClose();
      onPostCreated();
      Swal.fire({
        icon: 'success',
        title: t('success'),
        text: t('CreatedSucssesfuly'),
        confirmButtonText: t('OKButton'),
      });
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        Swal.fire({
          icon: 'error',
          title:t('Error'),
          text: error.response.data.message || t('wentWrong'),
          confirmButtonText: t('OKButton'),
        });
      } else {
        console.error('Error message:', error.message);
        Swal.fire({
          icon: 'error',
          title: t('Error'),
          text: t('wentWrong'),
          confirmButtonText: t('OKButton'),
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ zIndex: 1050 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          {t("createPostTypography")}
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createPostValidationSchema}
        >
          {({ setFieldValue, errors, touched, values, isValid, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Box mb={2} width="100%">
                {!mainImage && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="main-image-upload"
                      name="image"
                      onChange={(e) => handleMainImageUpload(e, setFieldValue)}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="main-image-upload">
                      <ImageButton
                        focusRipple
                        component="span"
                        style={{ width: '100%' }}
                      >
                        <ImageSrc style={{ backgroundImage: `url(${mainPreview || '/static/images/default.png'})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
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
                {mainPreview && (
                  <div style={{ position: 'relative' }}>
                    <img src={mainPreview} alt="Uploaded" style={{ width: '100%', height: 'auto', borderRadius: 10 }} />
                    <IconButton
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => handleDeleteMainImage(setFieldValue)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                )}
                <Box mt={2}>
                  <input
                    type="file"
                    accept="image/*"
                    id="sub-images-upload"
                    name="subImages"
                    onChange={(e) => handleSubImagesUpload(e, setFieldValue)}
                    style={{ display: 'none' }}
                    multiple
                  />
                  <label htmlFor="sub-images-upload">
                    <Button variant="contained" component="span" disabled={subImages.length >= 4}>
                      {t("uploadSubImages")}
                    </Button>
                  </label>
                  <Box display="flex" flexWrap="wrap" mt={2}>
                    {subPreviews.map((preview, _id) => (
                      <Box key={_id} position="relative" m={1}>
                        <img src={preview} alt={`Sub ${_id}`} style={{ width: 100, height: 100, borderRadius: 10 }} />
                        <IconButton
                          size="small"
                          style={{ position: 'absolute', top: 0, right: 0 }}
                          onClick={() => handleDeleteSubImage(_id, setFieldValue)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Field
                  name="bookName"
                  as={TextField}
                  label={t("bookName")}
                  fullWidth
                  margin="normal"
                  error={touched.bookName && Boolean(errors.bookName)}
                  helperText={touched.bookName && errors.bookName}
                />

                <Field
                  name="notes"
                  as={TextField}
                  label={t("notes")}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={6}
                />

                <FormControl component="fieldset" style={{ marginTop: 20 }}>
                  <FormLabel component="legend">{t("postType")}</FormLabel>
                  <RadioGroup row name="postType" value={values.postType} onChange={handleChange}>
                    <FormControlLabel value="Sell" control={<Radio />} label={t("sellType")} />
                    <FormControlLabel value="Donate" control={<Radio />} label={t("donateType")} />
                    <FormControlLabel value="Exchange" control={<Radio />} label={t("exchangeType")} />
                  </RadioGroup>
                </FormControl>

                {values.postType === 'Exchange' && (
                  <Field
                    name="exchangeBookName"
                    as={TextField}
                    label={t("exchangeBookName")}
                    fullWidth
                    margin="normal"
                    error={touched.exchangeBookName && Boolean(errors.exchangeBookName)}
                  helperText={touched.exchangeBookName && errors.exchangeBookName}
                  />
                )}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {t("postbutton")}
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    style={{ marginLeft: 10 }}
                    onClick={handleClose}
                  >
                    {t("cancelbutton")}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Dialog>
  );
};

export default CreateListing;
