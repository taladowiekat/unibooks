import React from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreatePostButton = () => {
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: 'large', 
                    padding: '10px 20px',
                    width: '350px'
                }}
            >
                Create your Post
                <AddCircleOutlineIcon sx={{padding: '12px' }} />
            </Button>
        </div>
    );
}

export default CreatePostButton;
