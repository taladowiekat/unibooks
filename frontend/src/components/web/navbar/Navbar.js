import * as React from 'react';
import { useState } from 'react';
import {
    Box, AppBar, Toolbar, Button,
    Divider, Typography, MenuItem, Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
function Navbar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const {t}=useTranslation();
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
                                     {t("home")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px' }}
                                    component={Link} to='allPosts'>
                                    <Typography variant='body' color='text.primary'>
                                        {t("allPosts")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px' }} component={Link}
                                    to='contactUs'>
                                    <Typography variant='body' color='text.primary'>
                                       {t ("contactUs")}
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
                                {t("signIn")}
                            </Button>
                            <Button color='primary' variant='outlined'
                                component={Link} to='register' >
                              {t ("signUp")}
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
                                    {t("home")}
                                    </MenuItem>
                                    <MenuItem component={Link} to='allPosts'>
                                    {t("allPosts")}
                                    </MenuItem>
                                    <MenuItem component={Link} to='contactUs'>
                                    {t ("contactUs")}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <Button color='primary' variant='outlined'
                                            component={Link} to='register'>
                                           {t ("signUp")}
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color='primary' variant='outlined'
                                            component={Link} to='login' >
                                            {t("signIn")}
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