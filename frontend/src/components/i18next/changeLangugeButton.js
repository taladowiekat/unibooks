import React, { useState } from 'react';
import { Button, Menu, MenuItem ,Box} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import palestine from './palestineFlag.png';
import USA from './USA.png'

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
          {Languages[0].code === "english" && <img src={USA} alt="USA Flag" style={{ width: 20, marginRight: "6%", marginLeft: "6%" }} />}
          {Languages[0].code === "arabic" && <img src={palestine} alt="Palestine Flag" style={{ width: 20, marginRight: "10%", marginLeft: "10%" }} />}
        </MenuItem>
        <MenuItem
          sx={{ color: "blue" }}
          className={Languages[1].code === i18n.language ? "selected" : ""}
          onClick={() => handleLanguageChange(Languages[1].code)}
        >
          {t("Arabic")}
          {Languages[1].code === "english" && <img src={USA} alt="USA Flag" style={{ width: 20, marginRight: "6%", marginLeft: "20%" }} />}
          {Languages[1].code === "arabic" && <img src={palestine} alt="Palestine Flag" style={{ width: 20, marginRight: "10%", marginLeft: "20%" }} />}
        </MenuItem>
      </Menu>
      
    </>
  );
}

export default ChangeLanguageButton;
