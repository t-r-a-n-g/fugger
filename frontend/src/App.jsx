import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import LogoutPage from "@components/authentification/logout";

import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2 } from "@components/themes";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";

import UserContext from "@contexts/UserContext";
import Api from "@services/Api";

function App() {
  const [theme, setTheme] = useState(true);
  const [user, setUser] = useState();

  const themeMode = !theme ? (
    <LooksTwoIcon onClick={() => setTheme(!theme)} />
  ) : (
    <LooksOneIcon onClick={() => setTheme(!theme)} />
  ); // Icons imported from `@material-ui/icons`
  const appliedTheme = createTheme(theme ? theme1 : theme2);

  useEffect(() => {
    async function getUser() {
      setUser(await Api.getCurrentUser());
    }
    getUser();
  }, []);

  if (user === undefined) return "Loading...";

  if (user === null) {
    return (
      <ThemeProvider theme={appliedTheme}>
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
      <ThemeProvider theme={appliedTheme}>
        <UserContext.Provider value={user}>
          <Router>
            <DrawerLayout themeMode={themeMode}>
              <Routes>
                <Route>
                  <Route path="/" element={<div>DASHBOARD</div>} />
                  <Route path="/analysis" element={<Analysis />} />

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
