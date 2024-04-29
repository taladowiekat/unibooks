import React, { useState } from 'react';
import { useFormik, ErrorMessage } from 'formik';
import { createPostValidationSchema } from '../web/validation/validation';
import { Grid, Paper, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, IconButton } from '@mui/material';
import { CloudUploadOutlined, DeleteOutlined } from '@mui/icons-material';
import Inputs from '../web/shared/inputs';

const CreateListing = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event, form) => {
    const uploadedImages = Array.from(event.currentTarget.files);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    form.setFieldValue('images', [...form.values.images, ...uploadedImages]);
  };

  const handleDeleteImage = (index, form) => {
    const updatedImages = form.values.images.filter((image, i) => i !== index);
    setImages(updatedImages);
    form.setFieldValue('images', updatedImages);
  };

  const initialValues = {
    bookName: '',
    notes: '',
    listingType: 'sell',
    images: [],
    exchangeBookName: ''
  };

  const onSubmit = (values, { resetForm }) => {
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createPostValidationSchema,
  });

  const renderInputs = (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
    <Box mb={2} width="100%" style={{ textAlign: 'center' }}>

      <input
        type="file"
        accept="image/*"
        id="image-upload"
        name="images"
        onChange={(event) => {
          formik.setFieldValue('images', event.currentTarget.files);
          handleImageUpload(event, formik);
        }}
        multiple
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
      </Box>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {formik.values.images && Array.from(formik.values.images).map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} style={{ width: 100, height: 100, borderRadius: 5, objectFit: 'cover' }} />
            <IconButton
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleDeleteImage(index, formik)}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
        ))}
      </div>

      {formik.errors.images && formik.touched.images && (
           <div style={{ marginTop: 10, color: 'red' }}>
          {formik.errors.images}
           </div>
                )}
      </div>

      <Inputs
        type="text"
        label="Book Name"
        name="bookName"
        value={formik.values.bookName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bookName && formik.errors.bookName}
        helperText={formik.touched.bookName && formik.errors.bookName}
      />
      
      <Inputs
        type="text"
        label="Notes"
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={6}
      />
      <FormControl component="fieldset" style={{ marginTop: 20 }}>
        <FormLabel component="legend">Listing Type</FormLabel>
        <RadioGroup row name="listingType" value={formik.values.listingType} onChange={formik.handleChange}>
          <FormControlLabel value="sell" control={<Radio />} label="Sell" />
          <FormControlLabel value="donate" control={<Radio />} label="Donate" />
          <FormControlLabel value="exchange" control={<Radio />} label="Exchange" />
        </RadioGroup>
      </FormControl>
      {formik.values.listingType === 'exchange' && (
        <Inputs
          type="text"
          label="Exchange Book Name"
          name="exchangeBookName"
          value={formik.values.exchangeBookName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
    </>
  );

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
            {renderInputs}
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>Post</Button>
              <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={formik.handleReset}>Cancel</Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateListing;
