import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateListing from './CreatPost.js';

const CreatePostButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                onClick={handleOpen}
            >
                Create your Post
                <AddCircleOutlineIcon sx={{padding: '12px' }} />
            </Button>
            <CreateListing open={open} handleClose={handleClose}/>
        </div>
    );
}

export default CreatePostButton;
