import React, { useState } from 'react';
import { Button, Menu, MenuItem ,Box} from '@mui/material';
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
    
        startIcon={<LanguageIcon sx={{ color: "black" }}/>}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          sx={{ color: "blue" }}
          className={Languages[0].code === i18n.language ? "selected" : ""}
          onClick={() => handleLanguageChange(Languages[0].code)}
        >
   {t("English")}
         
        </MenuItem>
        <MenuItem
          sx={{ color: "blue" }}
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
