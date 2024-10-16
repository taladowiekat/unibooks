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
    const [searchKeyword, setSearchKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);
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

    const handleOpenChat = (post) => {
        setActivePost(post);
        setOpen(true);
    };
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value.toLowerCase());
    };

    const filteredPosts = posts.filter(post => {
        return (post.postType.toLowerCase().includes(searchKeyword) || post.bookName.toLowerCase().includes(searchKeyword)) &&
            (category === '' || post.postType === category );
    });


    const handleCloseChat = () => {
        setOpen(false);
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
                        onChange={handleSearchChange}
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

                    {filteredPosts.map((post, index) => (
                        <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
                            <div
                                variants={itemAnimation}
                                initial="hidden"
                                animate="show"
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <PostCard
                                    id={post._id}
                                    userAvatar={post.studentID?.profilePicture}
                                    userName={post.studentID ? `${post.studentID.firstName} ${post.studentID.lastName}` : t('Unknown')}
                                    bookName={post.bookName}
                                    bookType={post.postType}
                                    image={post.mainImage.secure_url}
                                    onChatClick={() => handleOpenChat(post)}
                                    typeoperation={t(`typeoperation.${post.postType.toLowerCase()}`)}
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {activePost && (
                <Chats open={open} handleClose={handleCloseChat} email={activePost.email}   />
            )}
        </Box>
    );
};

export default Posts;
