import React, { useState } from 'react';
import { Button, Menu, MenuItem,Divider } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const Languages = [
  { code: "english" },
  { code: "arabic" }
];

const ChangeLanguageButton = () => {
  const { i18n,t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<LanguageIcon sx={{ color: "primary"}}/>}
        onClick={handleClick}
    
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      
      >
        <MenuItem
          sx={{ color: 'primary.main',fontSize:"14px", minWidth: "100px", padding: "6px 16px"}}
          className={Languages[0].code === i18n.language ? "selected" : ""}
          onClick={() => handleLanguageChange(Languages[0].code)}
        >
   {t("English")}
         
        </MenuItem>
        <Divider orientation="horizontal" flexItem />
        <MenuItem
          sx={{ color: 'primary.main',fontSize:"15px", minWidth: "100px", padding: "6px 16px" }}
          className={Languages[1].code === i18n.language ? "selected" : ""}
          onClick={() => handleLanguageChange(Languages[1].code)}
        >
          {t("Arabic")}
         
        </MenuItem>
      </Menu>
      
    </>
  );
}

export default ChangeLanguageButton;
