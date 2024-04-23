import React from 'react';
import { Typography, IconButton, Grid, AppBar, Container } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../../assets/Small_Unibooks_Logo__Name.png'

const Footer = () => {
    return (
        <AppBar position="fixed" color = 'default' sx={{ top: 'auto', bottom: 0 }}>
            <Container maxWidth={false} sx={{ p: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <img src={logo} alt="UNIBOOKS LOGO" style={{ maxHeight: '50px' }} />
                        <Typography sx={{ ml: 6, color: 'GrayText' }}>
                            SELL, EXCHANGE, DONATE
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton href="https://instagram.com">
                            <InstagramIcon fontSize='large' />
                        </IconButton>
                        <IconButton href="https://facebook.com">
                            <FacebookIcon fontSize='large' />
                        </IconButton>
                        <IconButton href="https://telegram.org">
                            <TelegramIcon fontSize='large' />
                        </IconButton>
                        <IconButton href="mailto:email@example.com">
                            <EmailIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
}

export default Footer;