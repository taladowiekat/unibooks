import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Avatar, Typography, Grid, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useValidations } from '../../components/validation/validation';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import InputsComponent from '../../components/shared/PostInfo.js';

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

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { editPostValidationSchema } = useValidations();
  const token = localStorage.getItem('token');

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/post/postdetails/${id}`);
        setPost(response.data);
        setImage(response.data.mainImage.secure_url);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    if (!image || typeof image === 'string') {
      setPreview(image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleUploadClick = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setImage(file);
      setFieldValue('selectedFile', file);
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('bookName', values.bookName);
    formData.append('notes', values.notes);
    formData.append('listingType', values.listingType);
    formData.append('status', values.status);
    if (values.selectedFile) {
      formData.append('mainImage', values.selectedFile);
    }
    formData.append('exchangeBookName', values.exchangeBookName);

    try {
      const response = await axios.put(`http://localhost:4000/post/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token__${token}`
        }
      });
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
    resetForm();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/post/remove/${id}`, {
        headers: {
          Authorization: `Token__${token}`
        }
      });
      navigate('/allPosts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>{t("loading")}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, zIndex: 1050 }} /* SweetAlert Z-Index is 1060. this is needed for alert to be on top */>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 , mt:'3rem'}}>
        <Avatar src={post.studentID?.avatar || 'defaultAvatar.jpg'} alt={post.studentID?.firstname} sx={{ width: 70, height: 70 }} />
        <Typography variant="h6">{`${post.studentID.firstname} ${post.studentID.lastname}`}</Typography>
      </Box>
      <Card sx={{ marginTop: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={post.mainImage.secure_url}
          alt={post.bookName}
        />
        <CardContent>
          <Typography variant="h5" component="div">{post.bookName}</Typography>
          <Typography variant="body2" color="text.secondary">{post.notes}</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">{t('subImages')}:</Typography>
            <Grid container spacing={2}>
              {post.subImages.map((image, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <img src={image.secure_url} alt={`subimage-${index}`} style={{ width: '100%' }} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {token && (
            <Box sx={{ marginTop: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>{t('editButton')}</Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>{t('deleteButton')}</Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <Box mt={3}>
          <Formik
            initialValues={{
              bookName: post.bookName,
              notes: post.notes,
              listingType: post.postType,
              exchangeBookName: post.exchangeBookName,
              status: post.status,
              selectedFile: null
            }}
            onSubmit={onSubmit}
            validationSchema={editPostValidationSchema}
          >
            {({ setFieldValue, errors, touched, values, isValid, handleChange, handleBlur }) => (
              <Form>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <ImageButton focusRipple style={{ width: '100%' }}>
                    <ImageSrc style={{ backgroundImage: `url(${preview})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Box>
                      <input
                        accept="image/*"
                        id="editImge"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleUploadClick(e, setFieldValue)}
                      />
                      <label htmlFor="editImge">
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
                    <InputsComponent
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                    />
                    <FormControl sx={{ marginTop: 2 }}>
                      <FormLabel>{t("status")}</FormLabel>
                      <RadioGroup row name="status" value={values.status} onChange={handleChange}>
                        <FormControlLabel value="Done" control={<Radio />} label={t("done")} />
                        <FormControlLabel value="Not yet" control={<Radio />} label={t("notYet")} />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" disabled={!isValid}>{t("saveButton")}</Button>
                    <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={() => setIsEditing(false)}>{t("cancelButton")}</Button>
                  </Box>
                </CardContent>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default PostDetails;
