import React from 'react';
import { Typography, IconButton, Grid, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const {t}=useTranslation();
    return (

        <Box 
            sx={{
                width: '100%',
                mt:'20rem',
            }}>

                <hr  />
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                            <img src='Small_Unibooks_Logo__Name.png' alt='UNIBOOKS LOGO' style={{ maxHeight: '45px' }} />
                            <Typography variant="subtitle1" sx={{ ml: 2 }}>SELL, EXCHANGE, DONATE</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                        <IconButton href='https://instagram.com' aria-label='Instagram'>
                            <InstagramIcon fontSize='large' />
                        </IconButton>
                        <IconButton href='https://facebook.com' aria-label='Facebook'>
                            <FacebookIcon fontSize='large' />
                        </IconButton>
                        <IconButton href='https://telegram.org' aria-label='Telegram'>
                            <TelegramIcon fontSize='large' />
                        </IconButton>
                        <IconButton href='mailto:email@example.com' aria-label='Email'>
                            <EmailIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                </Grid>
        </Box>
    );
}

export default Footer;