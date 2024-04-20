import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu,
    Container, Button, Tooltip, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import './Navbar.css';
import navbarLogo from './Small_Unibooks_Logo__Name.png';
import profileImg from './unknown profile img.jpg';

const pages = ['HOME', 'CONTACT US', 'ALL POSTS'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar>
            <Container maxWidth={false} className='navbar-container' >
                <Toolbar disableGutters>
                    {/* Logo for all screens */}
                    <img
                        src={navbarLogo}
                        alt="UNIBOOKS LOGO"
                        className='navbar-logo'
                        style={{ display: 'block', maxWidth: '150px', maxHeight: '50px', marginRight: '10px' }}
                    />

                    {/* Mobile menu icon */}
                    <Tooltip title="Pages" sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="pages-menu"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Pages menu */}
                    <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: { xs: 'none', md: 'block' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Mobile pages menu */}
                    <Menu
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Profile Avatar */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open profile" sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton sx={{ p: 0 }}>
                                <img
                                    src={profileImg}
                                    alt="Profile Img "
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
