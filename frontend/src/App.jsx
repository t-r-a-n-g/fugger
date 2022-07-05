import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

/* Layout & Theme Components */
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2, themeDark } from "@components/themes";

/* Auth Components */
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import LogoutPage from "@components/authentification/logout";

/* Page Components */
import Analysis from "@components/Analysis";
import Settings from "@components/settings/Settings";
import Files from "@components/files/Files";

/* Helpers & Libraries */
import UserContext from "@contexts/UserContext";
import Api from "@services/Api";
import BudgetPage from "@components/budget/BudgetPage/BudgetPage";
import i18n from "./i18nextConfig";

import "./App.css";

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
      <ThemeProvider theme={createTheme(appliedTheme.theme1)}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<LoginPage setUser={setUser} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
  i18n.changeLanguage(user.language);

  return (
    <RecoilRoot>
      <Suspense>
        <ThemeProvider theme={createTheme(appliedTheme[user.theme])}>
          <UserContext.Provider value={user}>
            <Router>
              <DrawerLayout currentTheme={theme}>
                <Routes>
                  <Route>
                    <Route path="/" element={<div>DASHBOARD</div>} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/budgets" element={<BudgetPage />} />

                    <Route
                      path="/settings"
                      element={
                        <Settings setUser={setUser} setTheme={setTheme} />
                      }
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
    </RecoilRoot>
  );
}

export default App;
