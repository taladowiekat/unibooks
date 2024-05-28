import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import {
    TextField,
    Button,
    InputAdornment,
    MenuItem,
    Select,
    Box,
    Container,
    Grid,
} from '@mui/material';
import CreatePostButton from '../../components/web/createPost/CreatePostButton.js';
import PostCard from '../../components/shared/Cards.js';
import Chats from './Chat.js';

const Posts = () => {
    const [category, setCategory] = useState('');
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null); 
    const { t } = useTranslation();

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}>
            <Container>
                <CreatePostButton onPostCreated={fetchPosts} />
                <Box sx={{ display: 'flex', gap: '1rem', width: '100%', mt: '10px' }}>
                    <TextField
                        placeholder={t("search2")}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            flexGrow: 1,
                            backgroundColor: 'white',
                            borderRadius: '4px',
                        }}
                    />
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            '& .MuiOutlinedInput-input': { py: '10px' },
                        }}
                    >
                        <MenuItem value="">{t("allCategories")}</MenuItem>
                        <MenuItem value="slides">{t("slides")}</MenuItem>
                        <MenuItem value="university_books">{t("compulsoryUniversityBooks")}</MenuItem>
                        <MenuItem value="specialty_books">{t("compulsorySpecialtyBooks")}</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: '4px',
                            '&:hover': { backgroundColor: '#555' },
                        }}
                    >
                        {t("Search")}
                    </Button>
                </Box>
                <Grid container spacing={2} justifyContent="center">
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
            </Container>
            {selectedMessageId && (
                <Chats messageId={selectedMessageId} open={open} handleClose={handleCloseChat} />
            )}
        </Box>
    );
};

export default Posts;
