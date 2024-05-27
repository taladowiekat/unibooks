<<<<<<< HEAD
import React from 'react';
import { Card, CardContent, CardMedia, Avatar, Typography, Button, Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function PostCard({ id,userAvatar, userName, bookName, bookType, image, typeoperation, onDelete ,onChatClick}) {
    const { t } = useTranslation();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: '1rem', flexDirection: 'column' }}>
            <Card sx={{ maxWidth: 360, borderRadius: '16px', boxShadow: 3 }}>
            <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
=======

import { Card, CardContent, CardMedia, Avatar, Typography, Button, Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';


function PostCard({ userAvatar, userName, bookName, bookType, image, typeoperation, onChatClick }) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: '1rem', flexDirection: 'column' }}>
            <Card sx={{ maxWidth: 360, borderRadius: '16px', boxShadow: 3 }}>
           
        <CardMedia
>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185
                    component="img"
                    sx={{
                        height: 180,
                        objectFit: 'cover',
                    }}
                    image={image}
                    alt={bookName}
                />
            </Link>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={userAvatar}
                            alt={userName}
                            sx={{ width: 50, height: 50 }}
                        />
                        <Typography variant="subtitle1" component="div">
                            {userName}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {bookName} / {bookType}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >
<<<<<<< HEAD
                    <IconButton color="primary" sx={{ mr: 1 }} onClick={onChatClick}>
=======
                        <IconButton color="primary" sx={{ mr: 1 }} onClick={onChatClick}>
>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185
                            <ChatIcon />
                        </IconButton>
                        <Button variant="contained" sx={{ backgroundColor: 'black' }}>
                            {typeoperation}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
export default PostCard;
