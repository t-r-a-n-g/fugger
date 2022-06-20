import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2, themeDark } from "@components/themes";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";

function App() {
  // Current theme
  const [theme, setTheme] = useState("theme1");

  // Theme mode toggle buttons. Set theme on click to next theme and displays matching button
  const themeMode = (
    <IconButton>
      <LooksOneIcon
        sx={
          theme === "theme1"
            ? { display: "block", color: "primary.contrastText" }
            : { display: "none" }
        }
        onClick={() => setTheme("theme2")}
      />
      <LooksTwoIcon
        sx={
          theme === "theme2"
            ? { display: "block", color: "primary.contrastText" }
            : { display: "none" }
        }
        onClick={() => setTheme("themeDark")}
      />
      <DarkModeIcon
        sx={
          theme === "themeDark"
            ? { display: "block", color: "primary.contrastText" }
            : { display: "none" }
        }
        onClick={() => setTheme("theme1")}
      />
    </IconButton>
  );

  // Set the applied theme depending on themeMode button group

  const appliedTheme = { theme1, theme2, themeDark };

  return (
    <ThemeProvider theme={createTheme(appliedTheme[theme])}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage theme={theme} />} />
          <Route>
            {/* ROUTES HERE */}
            <Route
              path="/analysis"
              element={
                <DrawerLayout themeMode={themeMode} currentTheme={theme}>
                  <Analysis />
                </DrawerLayout>
              }
            />
            {/* END OF ROUTES */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
