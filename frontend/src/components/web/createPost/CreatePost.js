import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { ButtonBase, Paper, Typography, Button, Box, Dialog, IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import InputsComponent from '../../shared/PostInfo';
import FormData from 'form-data';
import { useValidations } from '../../validation/validation.js';
import { useTranslation } from 'react-i18next';

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

const CreateListing = ({ open, handleClose }) => {
  const { createPostValidationSchema } = useValidations();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { t } = useTranslation();

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

  const initialValues = {
    bookName: '',
    notes: '',
    listingType: 'sell',
    image: '',
    exchangeBookName: ''
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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

                {preview && (
                  <div style={{ position: 'relative' }}>
                    <img src={preview} alt="Uploaded" style={{ width: '100%', height: 'auto', borderRadius: 10 }} />
                    <IconButton
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => handleDeleteImage(setFieldValue)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                )}
                <InputsComponent
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
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