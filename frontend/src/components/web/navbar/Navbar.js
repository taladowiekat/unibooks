import React, { useContext, useState } from 'react';
import { Box, AppBar, Toolbar, Button, MenuItem, Avatar, Typography, Drawer, Divider, Menu, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import ChangeLanguageButton from '../../i18next/changeLangugeButton';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext'; 

function Navbar() {
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setToken, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
=======
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const {t}=useTranslation();
    return (
        <>
            <AppBar position='fixed' color='default'>
                    <Toolbar >
                        <Box
                            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', }}>
                            <img src='Small_Unibooks_Logo__Name.png' alt='UNIBOOKS LOGO'
                                style={{ maxHeight: '45px' }} />
                            <Box sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'center', flexGrow: 1,
                            }}>
                                <Box sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'center', flexGrow: 1
                                ,mr:" 12%"
                            }}>
                                <MenuItem sx={{ py: '6px', px: '12px', ml:"30%" }}
                                    component={Link} to='/' >
                                    <Typography variant='body' color='text.primary'>
                                     {t("home")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px', }}
                                    component={Link} to='allPosts'>
                                    <Typography variant='body' color='text.primary'>
                                        {t("allPosts")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem sx={{ py: '6px', px: '12px', }} component={Link}
                                    to='contactUs'>
                                    <Typography variant='body' color='text.primary'>
                                       {t ("contactUs")}
                                    </Typography>
                                </MenuItem>
                                </Box>
                                <Box sx={{ py: '6px', px: '12px' ,mr:"5%" }}>
                                <MenuItem  sx={{ py: '6px',ml:"30%", px: '12px' }} >
                                    <ChangeLanguageButton  />
                               </MenuItem>
                               </Box>
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
                                    <MenuItem    >
                                    
                                                    <ChangeLanguageButton   />

                                       
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
            </AppBar>
        </>
    );
};
>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185

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
    navigate('/settings');
  };

  const goToUserPosts = () => {
    handleClose();
    navigate('/userPosts');
  };

  return (
    <>
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
                <Button variant="text" color="primary" onClick={toggleDrawer(false)}>
                  <ChangeLanguageButton />
                </Button>
              </MenuItem>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {user ? (
              <>
                <IconButton onClick={handleMenu}>
                
                <Typography variant='body' color='text.primary'>{user.firstname} {user.lastname}</Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to='/profile'>{t("settings")}</MenuItem>
                  <MenuItem onClick={goToUserPosts}>{t("myPosts")}</MenuItem>
                  <MenuItem onClick={logout}>{t("signOut")}</MenuItem>
                </Menu>
                <Typography variant='body' color='text.primary'>{user.firstname} {user.lastname}</Typography>
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
            <Button variant='text' color='primary' aria-label='menu' onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
              <MenuIcon sx={{ color: 'black' }} />
            </Button>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ minWidth: '35vw ', p: 2, backgroundColor: 'background.paper', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                  <MenuItem component={Link} to='/'>{t("home")}</MenuItem>
                  <MenuItem component={Link} to='/allPosts'>{t("allPosts")}</MenuItem>
                  <MenuItem component={Link} to='/contactUs'>{t("contactUs")}</MenuItem>
                  <Divider />
                  {user ? (
                    <>
                      <MenuItem>
                      
                      <Typography variant='body' color='text.primary'>{user.firstname} {user.lastname}</Typography>
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
                    </>
                  )}
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
