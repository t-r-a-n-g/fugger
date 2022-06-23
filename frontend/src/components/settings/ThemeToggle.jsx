import React from "react";
import { Button, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import UserContext from "@contexts/UserContext";
import Api from "@services/Api";

export default function ThemeToggle({ setUser }) {
  const { t } = useTranslation(); // i18next
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = React.useContext(UserContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseItem = (mode) => {
    setAnchorEl(null);
    const newUser = { ...user, theme: mode };
    Api.changeUser({ data: newUser });
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
        startIcon={<ColorLensIcon />}
      >
        {t("theme-toggle")}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
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
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
          onClick={() => handleCloseItem("theme1")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LooksOneIcon fontSize="small" />
          </ListItemIcon>
          Standard
        </MenuItem>
        <MenuItem
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
          onClick={() => handleCloseItem("theme2")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <LooksTwoIcon fontSize="small" />
          </ListItemIcon>
          Red Valvet
        </MenuItem>
        <MenuItem
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            },
          }}
          onClick={() => handleCloseItem("themeDark")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          Dark
        </MenuItem>
      </Menu>
    </div>
  );
}

ThemeToggle.propTypes = {
  setUser: PropTypes.node.isRequired,
};
