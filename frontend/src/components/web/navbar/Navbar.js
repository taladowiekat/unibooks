import React, { useContext, useState } from 'react';
import { Box, AppBar, Toolbar, Button, MenuItem, Typography, Drawer, Divider, Menu, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import ChangeLanguageButton from '../../i18next/changeLangugeButton';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, token, setUser, setToken, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    handleClose();
    navigate('/login');
  };

  const goToSettings = () => {
    handleClose();
    navigate('/profile');
  };

  const goToUserPosts = () => {
    handleClose();
    navigate('/userPosts');
  };
  
  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AppBar position='fixed' color='default'>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src='Small_Unibooks_Logo__Name.png' alt='UNIBOOKS LOGO' style={{ maxHeight: '45px' }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            <MenuItem sx={{ py: '6px', px: '12px', ml: "33%" }} component={Link} to='/'>
              <Typography variant='body' color='text.primary'>{t("home")}</Typography>
            </MenuItem>
            <MenuItem sx={{ py: '6px', px: '12px' }} component={Link} to='/allPosts'>
              <Typography variant='body' color='text.primary'>{t("allPosts")}</Typography>
            </MenuItem>
            <MenuItem sx={{ py: '6px', px: '12px' }} component={Link} to='/contactUs'>
              <Typography variant='body' color='text.primary'>{t("contactUs")}</Typography>
            </MenuItem>
            <MenuItem sx={{ py: '6px', px: '12px', ml: "30%" }}>
              <ChangeLanguageButton />
            </MenuItem>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
          {token ? (
            <>
              <Button onClick={handleMenu} color='inherit'>
                <Typography variant='body' sx={{ color: 'black' }}>
                  {user ? `${user.firstName} ${user.lastName}` : ''}
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/profile'>{t("settings")}</MenuItem>
                <MenuItem onClick={goToUserPosts}>{t("myPosts")}</MenuItem>
                <MenuItem onClick={logout}>{t("signOut")}</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color='primary' variant='outlined' component={Link} to='/login'>
                {t("signIn")}
              </Button>
              <Button color='primary' variant='outlined' component={Link} to='/register'>
                {t("signUp")}
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { md: 'none' } }}>
          <IconButton variant='text' color='primary' aria-label='menu' onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ minWidth: '35vw', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                <MenuItem component={Link} to='/'>{t("home")}</MenuItem>
                {token && <MenuItem component={Link} to='/allPosts'>{t("allPosts")}</MenuItem>}
                <MenuItem component={Link} to='/contactUs'>{t("contactUs")}</MenuItem>
                <Divider />
                {token ? (
                  <>
                    <MenuItem>
                      <Typography variant='body' color='text.primary'>{user ? `${user.firstName} ${user.lastName}` : ''}</Typography>
                    </MenuItem>
                    <MenuItem onClick={goToSettings}>{t("settings")}</MenuItem>
                    <MenuItem onClick={goToUserPosts}>{t("myPosts")}</MenuItem>
                    <MenuItem onClick={logout}>{t("signOut")}</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button color='primary' variant='outlined' component={Link} to='/register'>
                        {t("signUp")}
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color='primary' variant='outlined' component={Link} to='/login'>
                        {t("signIn")}
                      </Button>
                    </MenuItem>
                    <MenuItem sx={{ py: '6px', px: '12px', ml: "30%" }}>

                      <ChangeLanguageButton />

                    </MenuItem>

                  </>
                )}
              </Box>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
