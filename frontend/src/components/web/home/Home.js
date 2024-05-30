import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
} from '@mui/material';
import PostCard from '../../shared/Cards.js';
import Chats from '../../../pages/allPosts/Chat.js';
import profilePic from './photo.png';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const { t } = useTranslation();
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/post/getAllPosts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleOpenChat = (messageId) => {
        if (!token) {
            Swal.fire({
                title: t('loginRequired'),
                text: t('pleaseSignInToInteract'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: t('signIn'),
                cancelButtonText: t('cancel')
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        
        setSelectedMessageId(messageId);
        setOpen(true);
    };

    const handleCloseChat = () => {
        setOpen(false);
        setSelectedMessageId(null);
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column', width: '100%', padding: 0, margin: 0 }}>
            <Container>
                <Box sx={{ textAlign: 'center', mt: 4, width: '100%', padding: 0 }}>
                    <Card sx={{ position: 'relative', width: '100%' }}>
                        <CardMedia
                            component="img"
                            image={profilePic}
                            alt={t('encouragingMessage')}
                            sx={{
                                width: '100%',
                                height: '60vh',
                                objectFit: 'cover'
                            }}
                        />
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', textShadow: '2px 2px 2px rgba(255, 255, 255, 0.7)' }}>
                            <Typography variant="h4" align="right">
                                {t('We Made It Easy For You')}
                            </Typography>
                        </Box>
                    </Card>
                </Box>
                <Box sx={{ backgroundColor: '#c8dee1', padding: '1rem', textAlign: 'center' }}>
                    <Typography variant="h3" align="center" >
                        Here, you can explore all existing posts
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ margin: 0, width: '100%' }}>
                        {posts.map((post, index) => (
                            <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                                <div
                                    variants={itemAnimation}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <PostCard
                                        id={post._id}
                                        userAvatar={post.studentID?.profilePicture || 'defaultAvatar.jpg'}
                                        userName={post.studentID ? `${post.studentID.firstName} ${post.studentID.lastName}` : 'Unknown'}
                                        bookName={post.bookName}
                                        bookType={post.postType}
                                        image={post.mainImage.secure_url}
                                        onChatClick={() => handleOpenChat(post._id)}
                                        typeoperation={t(`typeoperation.${post.postType.toLowerCase()}`)}
                                    />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            {selectedMessageId && (
                <Chats messageId={selectedMessageId} open={open} handleClose={handleCloseChat} />
            )}
        </Box>
    );
};

export default Home;
