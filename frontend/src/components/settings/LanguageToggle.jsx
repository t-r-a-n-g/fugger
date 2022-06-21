import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import i18n from "i18next";

export default function LanguageToggle() {
  const { t } = useTranslation(); // i18next
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    i18n.changeLanguage();
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        variant="contained"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
      >
        {t("language-toggle")}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
          onClick={() => changeLanguage("de")}
        >
          Deutsch
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
          onClick={() => changeLanguage("en")}
        >
          English
        </MenuItem>
      </Menu>
    </div>
  );
}
