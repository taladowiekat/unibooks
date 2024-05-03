import React, { useState } from 'react';
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
import CreatePostButton from '../createPost/CreatePostButton.js';
import PostCard from '../../shared/Cards.js';

const Posts = () => {
    const [category, setCategory] = useState('');
    
    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const postsData = [
        {
            id: 1,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'donate',
            image: 'physics.png',
        },
        {
            id: 2,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: ' Handbook',
            type: 'Engineering',
            typeoperation: 'exhange',
            image: 'physics.png',
        },
        {
            id: 3,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'donate',
            image: 'physics.png',
        }
        ,
        {
            id: 4,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'exhange',

            image: 'physics.png',
        }
        ,
        {
            id: 5,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'donate',
            image: 'physics.png',
        }
        ,
        {
            id: 6,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'exhange',
            image: 'physics.png',
        }
        ,
        {
            id: 7,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'exhange',
            image: 'physics.png',
        }
        ,
        {
            id: 8,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane Smith',
            bookName: 'Handbook',
            type: 'Engineering',
            typeoperation: 'donate',
            image: 'physics.png',
        }
    ];
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}>
            <Container>
            <CreatePostButton />
            <Box sx={{ display: 'flex', gap: '1rem', width: '100%' , mt : '10px' }}>
                <TextField
                    placeholder="Article name or keywords..."
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
                    <MenuItem value="">All categories</MenuItem>
                    <MenuItem value="slides">Slides</MenuItem>
                    <MenuItem value="university_books">Compulsory university books</MenuItem>
                    <MenuItem value="specialty_books">Compulsory specialty books</MenuItem>
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
                    Search
                </Button>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                    {postsData.map((post, index) => (
                        <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
                            <div
                                variants={itemAnimation}
                                initial="hidden"
                                animate="show"
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <PostCard
                                    userAvatar={post.userAvatar}
                                    userName={post.userName}
                                    bookName={post.bookName}
                                    bookType={post.type}
                                    image={post.image}
                                    typeoperation={post.typeoperation}
                                />
                            </div>
                        </Grid>
                    ))}
                    
                    </Grid>
            </Container>
        </Box>
    );
};

export default Posts;



