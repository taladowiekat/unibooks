import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
TextField,
Button,
InputAdornment,
MenuItem,
Select,
Box,
} from '@mui/material';

const Posts = () => {
const [category, setCategory] = useState('');

return (
    <Box sx={{ display: 'flex',  alignItems: 'center', gap: '1rem', p: '1rem', flexDirection: 'column' }}>
        
    <Box sx={{ display: 'flex', gap: '1rem', width: '60%'}}>
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
    
</Box>
);
};

export default Posts;
