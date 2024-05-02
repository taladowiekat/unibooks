import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { createPostValidationSchema } from '../../validation/validation.js';
import { Paper, Typography, Button, Box, IconButton, Dialog } from '@mui/material';
import { CloudUploadOutlined, DeleteOutlined } from '@mui/icons-material';
import InputsComponent from '../../shared/postInfo.js';
import FormData from 'form-data';

const CreateListing = ({ open, handleClose }) => {
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

  const handleImageUpload = (e) => {
    const uploadedImage = e.currentTarget.files[0];
    setImage(uploadedImage);
    formik.setFieldValue('image', uploadedImage);
    setIsImageUploaded(true);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setIsImageUploaded(false);
    formik.setFieldValue('image', '');
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createPostValidationSchema,
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          Provide your post details
        </Typography>
        <form id="form" className="flex flex-col" onSubmit={formik.handleSubmit}>
        <Box mb={2} width="100%" style={{ textAlign: 'center' }}>
              {!isImageUploaded && (
                <div>
                  <input
                    type="file"
                    accept="image"
                    id="image-upload"
                    name="image"
                    onChange={(e) => {
                      formik.setFieldValue('image', e.currentTarget.files[0]);
                      handleImageUpload(e);
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
               
                {formik.errors.image && formik.touched.image && (
                <div style={{ marginTop: 10, color: 'red' }}>
                  {formik.errors.image}
                </div>
              )}
              </div>
            )}
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
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid}>Post</Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              style={{ marginLeft: 10 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  );
};

export default CreateListing;
