import React, { useState } from 'react';
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

    
const Posts = () => {
    const [category, setCategory] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    const {t}=useTranslation();
    const postsData = [
        {
            id: 1,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Alice',
            bookName: 'Th Code Brakr',
            type: 'donate',
            typeoperation: 'donate',
            image: 'codebreaker.png',
        },
        {
            id: 2,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Dave',
            bookName: 'Sapiens: A Brief History of Humankind',
            type: 'exchange',
            typeoperation: 'exchange',
            image: 'sapiens.png',
        },
        {
            id: 3,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Ella',
            bookName: 'Th Grt Gatsby',
            type: 'donate',
            typeoperation: 'donate',
            image: 'gatsby.png',
        },
        {
            id: 4,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Jane',
            bookName: 'Machine Learning Yearning',
            type: 'sell',
            typeoperation: 'sell',
            image: 'machinelearning.png',
        },
        {
            id: 5,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Kevin',
            bookName: 'The Lean Startup',
            type: 'donate',
            typeoperation: 'donate',
            image: 'leanstartup.png',
        },
        {
            id: 6,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Lily',
            bookName: 'Fundamentals of Physics',
            type: 'exchange',
            typeoperation: 'exchange',
            image: 'physics.png',
        },
        {
            id: 7,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Max',
            bookName: 'The Art of War',
            type: 'donate',
            typeoperation: 'donate',
            image: 'artofwar.png',
        },
        {
            id: 8,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Nathan',
            bookName: 'Data Science for Business',
            type: 'sell',
            typeoperation: 'sell',
            image: 'datascience.png',
        },
        {
            id: 9,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Olivia',
            bookName: 'Think and Grow Rich',
            type: 'sell',
            typeoperation: 'sell',
            image: 'thinkandgrowrich.png',
        },
        {
            id: 10,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Peter',
            bookName: 'The Innovator\'s Dilemma',
            type: 'exchange',
            typeoperation: 'exchange',
            image: 'innovatorsdilemma.png',
        },
        {
            id: 11,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Quinn',
            bookName: 'The Design of Everyday Things',
            type: 'donate',
            typeoperation: 'donate',
            image: 'designofeveryday.png',
        },
        {
            id: 12,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Rachel',
            bookName: 'Rich Dad Poor Dad',
            type: 'exchange',
            typeoperation: 'exchange',
            image: 'richdadpoordad.png',
        },
        {
            id: 13,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Sam',
            bookName: 'The Elements of Style',
            type: 'sell',
            typeoperation: 'sell',
            image: 'elementsofstyle.png',
        },
        {
            id: 14,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Tom',
            bookName: 'Thinking, Fast and Slow',
            type: 'exchange',
            typeoperation: 'exchange',
            image: 'thinkingfastslow.png',
        },
        {
            id: 15,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Uma',
            bookName: 'The Lean Startup',
            type: 'donate',
            typeoperation: 'donate',
            image: 'leanstartup.png',
        },
        {
            id: 16,
            userAvatar: 'ProfilePic.jpg',
            userName: 'Victor',
            bookName: 'Blockchain Basics',
            type: 'sell',
            typeoperation: 'sell',
            image: 'blockchainbasics.png',
        }

    ];
    

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value.toLowerCase());
    };


    const filteredPosts = postsData.filter(post => {
        return (post.typeoperation.toLowerCase().includes(searchKeyword) || post.userName.toLowerCase().includes(searchKeyword)) &&
            (category === '' || post.type === category || post.typeoperation === category);
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}>
            <Container>
            <CreatePostButton />
            <Box sx={{ display: 'flex', gap: '1rem', width: '100%' , mt : '10px' }}>
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
                    {filteredPosts.map((post, index) =>  (
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
                                    typeoperation={t(`typeoperation.${post.typeoperation}`)}
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



