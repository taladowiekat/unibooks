import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, Dialog, DialogContent, DialogActions, DialogTitle, CardContent, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useValidations } from '../../components/validation/validation';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {jwtDecode} from 'jwt-decode';

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

const EditPost = ({ open, handleClose, post, setPost }) => {
  const { t } = useTranslation();
  const { editPostValidationSchema } = useValidations();
  const token = localStorage.getItem('token');
  const [mainImage, setMainImage] = useState();
  const [mainImagePreview, setMainImagePreview] = useState();
  const [subImages, setSubImages] = useState([]);
  const [subImagePreviews, setSubImagePreviews] = useState([]);

  useEffect(() => {
    if (post && post.mainImage) {
      setMainImage(post.mainImage.secure_url);
      setSubImages(post.subImages || []);
    }
  }, [post]);

  useEffect(() => {
    if (!mainImage || typeof mainImage === 'string') {
      setMainImagePreview(mainImage);
      return;
    }
    const objectUrl = URL.createObjectURL(mainImage);
    setMainImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [mainImage]);

  useEffect(() => {
    const newPreviews = subImages.map(image => {
      if (image.secure_url) {
        return image.secure_url;
      } else if (image instanceof File) {
        return URL.createObjectURL(image);
      }
      return null;
    }).filter(image => image !== null);
    setSubImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => {
        if (url instanceof File) URL.revokeObjectURL(url);
      });
    };
  }, [subImages]);

  const handleUploadClick = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setMainImage(file);
      setFieldValue('selectedFile', file);
    }
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

  const handleDeleteSubImage = async (index, setFieldValue) => {
    const imageToDelete = subImages[index];
    try {
      await axios.post(`http://localhost:4000/post/deleteSubImage`, {
        postId: post._id,
        imageId: imageToDelete.public_id,
      }, {
        headers: {
          'Authorization': `Token__${token}`
        }
      });
      const newSubImages = subImages.filter((_, i) => i !== index);
      setSubImages(newSubImages);
      setFieldValue('subImages', newSubImages);
      setSubImagePreviews(newSubImages.map(image => (image.secure_url ? image.secure_url : URL.createObjectURL(image))));
    } catch (error) {
      console.error('Error deleting sub image:', error);
      Swal.fire({
        icon: 'error',
        title: t('deleteError'),
        text: t('errorDeletingSubImage')
      });
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('bookName', values.bookName);
    formData.append('notes', values.notes);
    formData.append('postType', values.postType);
    formData.append('status', values.status);
    formData.append('studentID', post.studentID);
    if (values.selectedFile) {
      formData.append('mainImage', values.selectedFile);
    }
    subImages.forEach((image) => {
      if (image instanceof File) {
        formData.append('subImages', image);
      } else {
        formData.append('existingSubImages', image.secure_url);
      }
    });
    formData.append('exchangeBookName', values.exchangeBookName);

    try {
      const response = await axios.put(`http://localhost:4000/post/update/${post._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token__${token}`
        }
      });
      setPost(response.data);
      handleClose();
      Swal.fire({
        icon: 'success',
        title: t('editSuccess'),
        text: t('postUpdatedSuccessfully')
      });
    } catch (error) {
      console.error('Error updating post:', error);
      Swal.fire({
        icon: 'error',
        title: t('editError'),
        text: t('errorUpdatingPost')
      });
    }
    resetForm();
  };

  if (!post) {
    return null;
  }

  const isOwner = () => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const userID = decodedToken.id; 
    return userID === post.studentID._id;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("editPost")}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            bookName: post.bookName,
            notes: post.notes,
            postType: post.postType,
            exchangeBookName: post.exchangeBookName || '',
            status: post.status,
            subImages: post.subImages,
          }}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={editPostValidationSchema}
        >
          {({ setFieldValue, errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ImageButton focusRipple style={{ width: '100%' }}>
                  <ImageSrc style={{ backgroundImage: `url(${mainImagePreview})` }} />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Box>
                    <input
                      accept="image/*"
                      id="editImage"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => handleUploadClick(e, setFieldValue)}
                    />
                    <label htmlFor="editImage">
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
                        {t("editImage")}
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </label>
                  </Box>
                </ImageButton>
              </Box>

              <CardContent>
                <Box display="flex" flexDirection="column">
                  <TextField
                    label={t("bookName")}
                    name="bookName"
                    value={values.bookName}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('bookName', e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={touched.bookName && Boolean(errors.bookName)}
                    helperText={touched.bookName && errors.bookName}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label={t("notes")}
                    name="notes"
                    value={values.notes}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('notes', e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl sx={{ marginTop: 2 }}>
                    <FormLabel>{t("postType")}</FormLabel>
                    <RadioGroup row name="postType" value={values.postType} onChange={(e) => {
                      setFieldValue('postType', e.target.value);
                    }}>
                      <FormControlLabel value="Sell" control={<Radio />} label={t("Sell")} />
                      <FormControlLabel value="Exchange" control={<Radio />} label={t("Exchange")} />
                      <FormControlLabel value="Donate" control={<Radio />} label={t("Donate")} />
                    </RadioGroup>
                  </FormControl>
                  {values.postType === 'Exchange' && (
                    <TextField
                      label={t("exchangeBookName")}
                      name="exchangeBookName"
                      value={values.exchangeBookName}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue('exchangeBookName', e.target.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.exchangeBookName && Boolean(errors.exchangeBookName)}
                      helperText={touched.exchangeBookName && errors.exchangeBookName}
                      fullWidth
                      margin="normal"
                    />
                  )}
                  <FormControl sx={{ marginTop: 2 }}>
                    <FormLabel>{t("status")}</FormLabel>
                    <RadioGroup row name="status" value={values.status} onChange={(e) => {
                      setFieldValue('status', e.target.value);
                    }}>
                      <FormControlLabel value="active" control={<Radio />} label={t("active")} />
                      <FormControlLabel value="inactive" control={<Radio />} label={t("inactive")} />
                    </RadioGroup>
                  </FormControl>

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
                      {subImagePreviews.map((preview, index) => (
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
                </Box>
              </CardContent>
              {isOwner() && (
                <DialogActions>
                  <Button type="button" variant="contained" color="error" onClick={handleClose}>{t("cancelButton")}</Button>
                  <Button type="submit" variant="contained" color="primary">{t("saveButton")}</Button>
                </DialogActions>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
