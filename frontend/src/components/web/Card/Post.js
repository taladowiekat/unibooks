import React from 'react';
import { Card, CardContent,
    CardMedia, Avatar, Typography, Button,Box,IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import userAvatar from './ProfilePic.jpg';
import bookImage from './physics.png'; 

const PostCard = () => {
    const postData = {
    userAvatar: userAvatar, 
    userName: 'Adham Lahlooh',
    notes: 'notes about the book.',
    bookName: 'Physics',
    type: 'Science',
    image: bookImage, 
    };
    
return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: '1rem', flexDirection: 'column' }}>
<Card sx={{ maxWidth: 360, borderRadius: '16px', position: 'relative' }}>
    <CardMedia
    component="img"
    height="300"
    image={postData.image}
    alt={postData.bookName}
    />
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: '-12px' }}>
        <Avatar
        src={postData.userAvatar}
        alt={postData.userName}
        sx={{ width: 50, height: 50 }}
        />
        <Typography variant="subtitle1">
        {postData.userName}
        </Typography>
    </Box>
    <Typography variant="body2" color="text.secondary">
        {postData.notes}
    </Typography>
    <Typography variant="body2" color="text.primary">
        {postData.bookName} / {postData.type}
    </Typography>
    </CardContent>
    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
    <IconButton color="primary" sx={{ marginRight: 1}}>
        <ChatIcon />
    </IconButton>
    <Button variant="contained" color="primary"
    sx={{ backgroundColor: 'black' }}
    >
        Donate
    </Button>
    </Box>
</Card>
</Box>
);
}

export default PostCard;
