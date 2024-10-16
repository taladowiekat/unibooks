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
                top:'auto',
                bottom: 0, 
                boxShadow: '0px -5px 7px -5px rgba(0, 0, 0, 0.5)',
                flexGrow: 1,
                display: 'flex',
                
            }}>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item >
                    <img src='Small_Unibooks_Logo__Name.png' alt='UNIBOOKS LOGO' style={{ paddingLeft:'15px' , maxHeight: '45px' }} />
                    <Typography sx={{ ml: 6, color: 'GrayText' }}>
                        {t("SELLEXCHANGEDONATE")}
                    </Typography>
                </Grid>
                <Grid item style={{paddingRight: '13px' }} >
                    <IconButton href='https://instagram.com'>
                        <InstagramIcon fontSize='large' />
                    </IconButton>
                    <IconButton href='https://facebook.com'>
                        <FacebookIcon fontSize='large' />
                    </IconButton>
                    <IconButton href='https://telegram.org'>
                        <TelegramIcon fontSize='large' />
                    </IconButton>
                    <IconButton href='mailto:email@example.com'>
                        <EmailIcon fontSize='large' />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;

