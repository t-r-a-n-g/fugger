import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

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
import BudgetPage from "@components/budget/BudgetPage/BudgetPage";
import Settings from "@components/settings/Settings";
import Files from "@components/files/Files";
import ProfilePage from "@components/profilePage";

/* Helpers & Libraries */
import userAtom from "@recoil/users";
import i18n from "./i18nextConfig";

import "./App.css";

function App() {
  // Set the applied theme depending on themeMode button group
  const appliedTheme = { theme1, theme2, themeDark };

  // we have to use recoil state and not value, because its throwing an error when using value. maybe a bug in recoil?
  // eslint-disable-next-line
  const userLoadable = useRecoilValueLoadable(userAtom);
  let user = {};

  if (userLoadable.state === "hasValue") user = userLoadable.contents;
  if (user === null || user.isLoading === true) return "Loading...";

  if (user.isAuthenticated === false) {
    return (
      <ThemeProvider theme={createTheme(appliedTheme.themeDark)}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }


  if (user.isAuthenticated === true && user.isLoading === false) {
    i18n.changeLanguage(user.data.language);
    return (
      <ThemeProvider theme={createTheme(appliedTheme[user.data.theme])}>
        <Router>
          <DrawerLayout currentTheme={user.data.theme}>
            <Routes>
              <Route>
                <Route path="/" element={<Analysis />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/budgets" element={<BudgetPage />} />

                <Route path="/settings" element={<Settings />} />
                <Route path="/files" element={<Files />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
                <Route path="/logout" element={<LogoutPage />} />
              </Route>
            </Routes>
          </DrawerLayout>
        </Router>
      </ThemeProvider>
    );
  }

  return null;

}

export default App;
