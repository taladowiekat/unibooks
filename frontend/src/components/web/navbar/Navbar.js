import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/Small_Unibooks_Logo__Name.png'
const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useMediaQuery(theme.breakpoints.up('md'), {
        noSsr: true,
        onChange: matches => {
            if (!matches) {
                setAnchorEl(null);
            }
        },
    });

    return (
        <AppBar component="nav" color="default" elevation={0}>
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" color="inherit" noWrap sx={{ margin: '0 16px' }}>
                    <img src={logo} alt="UNIBOOKS LOGO" style={{ maxHeight: '50px' }} />
                    </Typography>
                </Box>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    {!isMobile && (
                        <>
                            <Button color="inherit">Home</Button>
                            <Button color="inherit">Contact Us</Button>
                            <Button color="inherit">All Posts</Button>
                        </>
                    )}
                </Box>

                {!isMobile && (
                    <Box>
                        <Button variant="outlined" sx={{ margin: '0 8px' }}>Log-In</Button>
                        <Button variant="contained" disableElevation>Sign-Up</Button>
                    </Box>
                )}
                {isMobile && (
                    <IconButton edge="end" color="inherit" onClick={handleMenu} aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                )}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                    <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                    <MenuItem onClick={handleClose}>All Posts</MenuItem>
                    <MenuItem onClick={handleClose}>Log-In</MenuItem>
                    <MenuItem onClick={handleClose}>Sign-Up</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;