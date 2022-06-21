import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/Login";
import SignUpPage from "@components/authentification/SignUp";
import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2, themeDark } from "@components/themes";
import Settings from "@components/settings/Settings";

function App() {
  // Set the applied theme depending on themeMode button group
  const appliedTheme = { theme1, theme2, themeDark };
  const [theme, setTheme] = useState("theme1");

  return (
    <ThemeProvider theme={createTheme(appliedTheme[theme])}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route>
            {/* ROUTES HERE */}
            <Route
              path="/analysis"
              element={
                <DrawerLayout currentTheme={theme}>
                  <Analysis />
                </DrawerLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DrawerLayout currentTheme={theme}>
                  <Settings setTheme={setTheme} />
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
