import * as React from "react";
import { DashboardMenuItem, Menu, MenuItemLink } from "react-admin";
import BookIcon from "@mui/icons-material/Book";

export default function MyMenu(props) {
  return (
    <Menu {...props}>
      <DashboardMenuItem primaryText="test" />
      <MenuItemLink
        to="/upload"
        primaryText="Upload Page"
        leftIcon={<BookIcon />}
      />
      <MenuItemLink to="/test" primaryText="Trang 1" leftIcon={<BookIcon />} />
      <MenuItemLink to="/test" primaryText="Trang 2" leftIcon={<BookIcon />} />
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
