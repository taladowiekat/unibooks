import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { ButtonBase, Paper, Typography, Button, Box, Dialog, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import InputsComponent from '../../shared/PostInfo';
import { useValidations } from '../../validation/validation.js';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext.js';


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
  const { token } = useContext(UserContext); // احصل على التوكن من الـ Context

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
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
      alert('You can upload up to 4 sub-images only.');
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
    postType: 'sell',
    image: '',
    subImages: [],
    exchangeBookName: ''
  };

  const onSubmit = async (values, { resetForm }) => {
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
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ zIndex: 1050 }} /* SweetAlert Z-Index is 1060. this is needed for alert to be on top */ >
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          {t("createPostTypography")}
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createPostValidationSchema}
        >
          {({ setFieldValue, errors, touched, values, isValid, handleChange, handleBlur }) => (
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
                    {subPreviews.map((preview, index) => (
                      <Box key={index} position="relative" m={1}>
                        <img src={preview} alt={`Sub ${index}`} style={{ width: 100, height: 100, borderRadius: 10 }} />
                        <IconButton
                          size="small"
                          style={{ position: 'absolute', top: 0, right: 0 }}
                          onClick={() => handleDeleteSubImage(index, setFieldValue)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <InputsComponent
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
                <Box mt={2}>
                  <RadioGroup
                    name="postType"
                    value={values.postType}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Sell" control={<Radio />} label={t("Sell")} />
                    <FormControlLabel value="Exchange" control={<Radio />} label={t("Exchange")} />
                    <FormControlLabel value="Donate" control={<Radio />} label={t("Donate")} />
                  </RadioGroup>
                  {errors.postType && touched.postType && (
                    <div style={{ marginTop: 10, color: 'red' }}>
                      {errors.postType}
                    </div>
                  )}
                </Box>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
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
            </Form>
          )}
        </Formik>
      </Paper>
    </Dialog>
  );
};

export default CreateListing;