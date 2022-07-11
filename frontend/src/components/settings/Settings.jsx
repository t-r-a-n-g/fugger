import PropTypes from "prop-types";
import React from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Settings({ setUser }) {
  const { t } = useTranslation(); // i18next

  return (
    <Stack spacing={2} sx={{px:2}}>
      <h1>{t("menu-item-settings")}</h1>
      <ThemeToggle setUser={setUser} />
      <LanguageToggle setUser={setUser} />
    </Stack>
  );
}

Settings.propTypes = {
  setUser: PropTypes.func.isRequired,
};
