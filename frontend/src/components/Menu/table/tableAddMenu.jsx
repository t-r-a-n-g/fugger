import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";

const options = ["Add Line", "Add KPI Calculation", "Add Data manually"];

const ITEM_HEIGHT = 48;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  marginLeft: "5px",
  marginRight: "5px",
  paddingLeft: "15px",
  color: theme.palette.text.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: "10px",
  },
}));

export default function TableAddMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddBoxIcon color="primary" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "fit-content",
          },
        }}
      >
        {options.map((option) => (
          <StyledMenuItem key={option} onClick={handleClose}>
            {option}
          </StyledMenuItem>
        ))}
      </Menu>
    </div>
  );
}
