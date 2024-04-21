import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, IconButton } from '@mui/material';
import { CloudUploadOutlined, DeleteOutlined } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createPostValidationSchema } from './web/validation/validation';

const CreateListing = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event, form) => {
    const uploadedImages = Array.from(event.currentTarget.files);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    form.setFieldValue('images', [...form.values.images, ...uploadedImages]);
  };

  const handleDeleteImage = (index, form) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    const updatedImages = form.values.images.filter((_, i) => i !== index);
    form.setFieldValue('images', updatedImages);
  };

  const handleCancel = (resetForm, setErrors) => {
    resetForm();
    setErrors({});
    setImages([]);
  };


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Provide your post details
          </Typography>
          <Formik
            initialValues={{
              bookName: '',
              notes: '',
              listingType: 'sell',
              images: [],
              exchangeBookName: ''
            }}
            validationSchema={createPostValidationSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
            }}
          >
            {({ isSubmitting, resetForm, setErrors, values }) => (
              <Form>
                <Field name="images">
                  {({ field, form }) => (
                    <>
                      <Box mb={2} width="100%" style={{ textAlign: 'center' }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="image-upload"
                          multiple
                          style={{ display: 'none' }}
                          onChange={(event) => {
                            form.setFieldValue('images', event.currentTarget.files);
                            handleImageUpload(event, form);
                          }}
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
                      </Box>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {form.values.images && Array.from(form.values.images).map((image, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} style={{ width: 100, height: 100, borderRadius: 5, objectFit: 'cover' }} />
                            <IconButton
                              style={{ position: 'absolute', top: 0, right: 0 }}
                              onClick={() => handleDeleteImage(index, form)}
                            >
                              <DeleteOutlined />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                      {form.isSubmitting && <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>Uploading images...</Typography>}
                      <ErrorMessage name="images" component="div" style={{ marginTop: 10, color: 'red' }} />
                    </>
                  )}
                </Field>
                <Field name="bookName">
                  {({ field, form }) => (
                    <TextField           
                      fullWidth
                      label="Book Name"
                      {...field}
                      error={form.errors.bookName && form.touched.bookName}
                      helperText={form.errors.bookName && form.touched.bookName && form.errors.bookName}
                      style={{ marginTop: 20 }}
                    />
                  )}
                </Field>
                <Field name="notes">
                  {({ field }) => (
                    <TextField
                      fullWidth
                      label="Notes"
                      multiline
                      rows={4}
                      {...field}
                      style={{ marginTop: 20 }}
                    />
                  )}
                </Field>
                <Field name="listingType">
                  {({ field }) => (
                    <FormControl component="fieldset" style={{ marginTop: 20 }}>
                      <FormLabel component="legend">Listing Type</FormLabel>
                      <RadioGroup row {...field}> 
                        <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                        <FormControlLabel value="donate" control={<Radio />} label="Donate" />
                        <FormControlLabel value="exchange" control={<Radio />} label="Exchange" />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
                {values.listingType === 'exchange' && (
                  <Field name="exchangeBookName">
                    {({ field, form }) => (
                      <TextField
                        fullWidth
                        label="Exchange Book Name"
                        {...field}
                        style={{ marginTop: 20 }}
                      />
                    )}
                  </Field>
                )}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Post</Button>
                  <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={() => handleCancel(resetForm, setErrors)}>Cancel</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateListing;
