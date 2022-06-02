import * as React from "react";
import { Menu, MenuItemLink } from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import GridViewIcon from "@mui/icons-material/GridView";

export default function MyMenu(props) {
  return (
    <Menu {...props}>
      {/*  <DashboardMenuItem primaryText="test" /> */}
      <MenuItemLink
        to="/test"
        primaryText="Analysis"
        leftIcon={<GridViewIcon />}
      />
      <MenuItemLink
        to="/test2"
        primaryText="Analysis 2"
        leftIcon={<GridViewIcon />}
      />
      <MenuItemLink to="/test" primaryText="Andras 1" leftIcon={<BookIcon />} />
      <MenuItemLink to="/test" primaryText="Andras 1" leftIcon={<BookIcon />} />
      <MenuItemLink
        to="/test"
        primaryText="Norbert 1"
        leftIcon={<BookIcon />}
      />
      <MenuItemLink
        to="/test"
        primaryText="Norbert 2"
        leftIcon={<BookIcon />}
      />
      <MenuItemLink
        to="/test"
        primaryText="Norbert 3"
        leftIcon={<BookIcon />}
      />
    </Menu>
  );
}
