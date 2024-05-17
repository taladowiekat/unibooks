import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateListing from './CreatePost.js';
import { useTranslation } from 'react-i18next';
const CreatePostButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {t}=useTranslation();
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '85px'}}>
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
                {t("createyourPost")}
                <AddCircleOutlineIcon sx={{padding: '12px' }} />
            </Button>
            <CreateListing open={open} handleClose={handleClose}/>
        </div>
    );
}

export default CreatePostButton;
