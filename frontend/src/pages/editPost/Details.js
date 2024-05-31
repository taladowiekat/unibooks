import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Avatar, Typography, Grid, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import EditPostDialog from './EditPost.js';
import {jwtDecode} from 'jwt-decode';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/post/postdetails/${id}`);
        setPost(response.data);

        if (token) {
          const decodedToken = jwtDecode(token);
          if (response.data.studentID._id === decodedToken.id) {
            setIsOwner(true);
          }
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
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
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 , mt:'3rem'}}>
        {post.studentID && (
          <Avatar src={post.studentID.profilePicture} alt={post.studentID.firstname} sx={{ width: 70, height: 70 }} />
        )}
        {post.studentID && (
          <Typography variant="h6">{`${post.studentID.firstName} ${post.studentID.lastName}`}</Typography>
        )}
      </Box>
      <Card sx={{ marginTop: 3 }}>
        {post.mainImage && (
          <CardMedia
            component="img"
            height="300"
            image={post.mainImage.secure_url}
            alt={post.bookName}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div">{post.bookName}</Typography>
          <Typography variant="body2" color="text.secondary">{post.notes}</Typography>
          <Typography variant="body2" color="text.secondary">{post.status}</Typography>
          {post.postType === 'Exchange' && (
            <Typography variant="body2" color="text.secondary">
              {t('exchangeBookName')}: {post.exchangeBookName}
            </Typography>
          )}
          {post.postType === 'Donate' && (
            <Typography variant="body2" color="text.secondary">
              {t('donate')}
            </Typography>
          )}
          {post.postType === 'Sell' && (
            <Typography variant="body2" color="text.secondary">
              {t('sell')}
            </Typography>
          )}
          <Box sx={{ marginTop: 2 }}>
            <Grid container spacing={2}>
              {post.subImages && post.subImages.map((image, id) => (
                <Grid item key={id} xs={6} sm={4} md={3}>
                  <img src={image.secure_url} alt={`subimage-${id}`} style={{ width: '100%' }} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {isOwner && (
            <Box sx={{ marginTop: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEditClick}>{t('editButton')}</Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>{t('deleteButton')}</Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <EditPostDialog open={isEditing} handleClose={handleEditClose} post={post} setPost={setPost} />
      )}
    </Box>
  );
};


export default PostDetails;
