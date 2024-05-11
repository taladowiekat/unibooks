import * as React from 'react';
import { useState } from 'react';
import {
    Box, AppBar, Toolbar, Button,
    Divider, Typography, MenuItem, Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


function Navbar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <AppBar position='fixed' color='default'  >
                    <Toolbar >
                        <Box
                            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', }}>
                            <img src='Small_Unibooks_Logo__Name.png' alt='UNIBOOKS LOGO'
                                style={{ maxHeight: '45px' }} />
                            <Box sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'center', flexGrow: 1,
                            }}>
                                <MenuItem sx={{ py: '6px', px: '12px' }}
                                    component={Link} to='/' >
                                    <Typography variant='body' color='text.primary'>
                                        Home
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px' }}
                                    component={Link} to='allPosts'>
                                    <Typography variant='body' color='text.primary'>
                                        All Posts
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px' }} component={Link}
                                    to='contactUs'>
                                    <Typography variant='body' color='text.primary'>
                                        Contact Us
                                    </Typography>
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5, alignItems: 'center'
                            }}>
                            <Button color='primary' variant='outlined'
                                component={Link} to='login' >
                                Sign in
                            </Button>
                            <Button color='primary' variant='outlined'
                                component={Link} to='register' >
                                Sign up
                            </Button>
                        </Box>
                        <Box sx={{ display: { md: 'none' } }}>
                            <Button variant='text' color='primary' aria-label='menu'
                                onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }} >
                                <MenuIcon sx={{ color:'black' }} />
                            </Button>
                            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                                <Box sx={{
                                    minWidth: '35vw ', p: 2,
                                    backgroundColor: 'background.paper', flexGrow: 1,
                                }} >
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'end', flexGrow: 1,
                                    }} >
                                    </Box>
                                    <MenuItem>
                                        Home
                                    </MenuItem>
                                    <MenuItem component={Link} to='allPosts'>
                                        All Posts
                                    </MenuItem>
                                    <MenuItem component={Link} to='contactUs'>
                                        Contact us
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <Button color='primary' variant='outlined'
                                            component={Link} to='register'>
                                            Sign up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color='primary' variant='outlined'
                                            component={Link} to='login' >
                                            Sign in
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;