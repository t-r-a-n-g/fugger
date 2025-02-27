import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import UserContext from "@contexts/UserContext";
import Api from "@services/Api";

function LanguageToggle({ setUser }) {
  const { t } = useTranslation(); // i18next
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = React.useContext(UserContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleLanguage = (lng) => {
    handleClose();
    const newUser = { ...user, language: lng };
    Api.users.put({ data: newUser });
    setUser(newUser);
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
          onClick={() => toggleLanguage("de-DE")}
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
          onClick={() => toggleLanguage("en-US")}
        >
          English
        </MenuItem>
      </Menu>
    </div>
  );
}

LanguageToggle.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LanguageToggle;
