import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { createPostValidationSchema } from '../../validation/validation';
import { Grid, Paper, Typography, Button, Box, IconButton } from '@mui/material';
import { CloudUploadOutlined, DeleteOutlined } from '@mui/icons-material';
import InputsComponent from '../shared/inputsComponent';

const CreateListing = () => {
  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
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

  const handleImageUpload = (event, form) => {
    const uploadedImage = event.currentTarget.files[0];
    setImage(uploadedImage);
    form.setFieldValue('image', uploadedImage);
    setIsImageUploaded(true);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setIsImageUploaded(false);
   // formik.setFieldError('image', '');

  };

  const initialValues = {
    bookName: '',
    notes: '',
    listingType: 'sell',
    image: null,
    exchangeBookName: ''
  };

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    setImage(null);
    setIsImageUploaded(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createPostValidationSchema,
  });

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
            Provide your post details
          </Typography>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={formik.handleSubmit}
          >
            <Box mb={2} width="100%" style={{ textAlign: 'center' }}>
              {!isImageUploaded && (
                <div>
                  <input
                    type="file"
                    accept="image"
                    id="image-upload"
                    name="image"
                    onChange={(event) => {
                      formik.setFieldValue('image', event.currentTarget.files[0]);
                      handleImageUpload(event, formik);
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadOutlined />}
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>
              )}

                {formik.errors.image && formik.touched.image && (
                <div style={{ marginTop: 10, color: 'red' }}>
                 {formik.errors.image}
                </div>
                        )}

            </Box>
            
            {preview && (
              <div style={{ position: 'relative' }}>
                <img src={preview} alt="Uploaded" style={{ width: '100%', height: '50%', borderRadius: 10 }} />
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={handleDeleteImage}
                >
                  <DeleteOutlined />
                </IconButton>
              </div>
              
            )}
            <InputsComponent formik={formik} />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>Post</Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                style={{ marginLeft: 10 }}
                onClick={() => { formik.handleReset(); setIsImageUploaded(false); setImage(null); }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateListing;
