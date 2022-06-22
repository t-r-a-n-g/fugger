import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import LogoutPage from "@components/authentification/logout";

import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2, themeDark } from "@components/themes";
import Settings from "@components/settings/Settings";
import Files from "@components/files/Files";

import UserContext from "@contexts/UserContext";
import Api from "@services/Api";

function App() {
  // Set the applied theme depending on themeMode button group
  const appliedTheme = { theme1, theme2, themeDark };
  const [theme, setTheme] = useState("theme1");
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      setUser(await Api.getCurrentUser());
    }
    getUser();
  }, []);

  if (user === undefined) return "Loading...";

  if (user === null) {
    return (
      <ThemeProvider theme={createTheme(appliedTheme[theme])}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<LoginPage setUser={setUser} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <Suspense>
      <ThemeProvider theme={createTheme(appliedTheme[theme])}>
        <UserContext.Provider value={user}>
          <Router>
            <DrawerLayout currentTheme={theme}>
              <Routes>
                <Route>
                  <Route path="/" element={<div>DASHBOARD</div>} />
                  <Route path="/analysis" element={<Analysis />} />

                  <Route
                    path="/settings"
                    element={<Settings setTheme={setTheme} />}
                  />
                  <Route path="/files" element={<Files />} />
                  <Route
                    path="/logout"
                    element={<LogoutPage setUser={setUser} />}
                  />
                </Route>
              </Routes>
            </DrawerLayout>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
