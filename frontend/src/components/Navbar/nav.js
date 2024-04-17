import React from 'react';

import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoImage from './Small_Unibooks_Logo__Name.png'

const NavBar = () => {
    return (
        <AppBar color="default" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={logoImage} alt="UNIBOOKS Logo" style={{ height: 50 }} />
                </Typography>

                
                <Box sx={{ display: 'flex', flexGrow: 22, justifyContent: 'center' , gap : 4}}>
                    <Button color="inherit" href="#home" >HOME</Button>
                    <Button color="inherit" href="#contact-us" >CONTACT US</Button>
                    <Button color="inherit" href="#all-posts" >ALL POSTS</Button>
                </Box>

                
                <Box sx={{ display: 'flex', flexGrow: 0 }}>
                    <IconButton color="inherit" href="#login" >
                        <AccountCircleIcon />
                    </IconButton>
                    <Button variant="outlined" href="#sign-up" >SIGN-UP</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;