import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Paper, Typography, Button, Box, IconButton, Dialog } from '@mui/material';
import { CloudUploadOutlined, DeleteOutlined } from '@mui/icons-material';
import InputsComponent from '../../shared/PostInfo';
import FormData from 'form-data';
import { useValidations } from '../../validation/validation.js';
import { useTranslation } from 'react-i18next';

const CreateListing = ({ open, handleClose }) => {
  const { createPostValidationSchema } = useValidations();
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
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
    setIsImageUploaded(true);
  };

  const handleDeleteImage = (setFieldValue) => {
    setImage(null);
    setIsImageUploaded(false);
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
    setIsImageUploaded(false);
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
              <Box mb={2} width="100%" style={{ textAlign: 'center' }}>
                {!isImageUploaded && (
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
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadOutlined />}
                      >
                        {t("uploadImage")}
                      </Button>
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
                    <img src={preview} alt="Uploaded" style={{ width: '100%', height: '50%', borderRadius: 10 }} />
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
