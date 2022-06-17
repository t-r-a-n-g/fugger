import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2 } from "@components/themes";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";

function App() {
  const [theme, setTheme] = useState(true);
  const themeMode = !theme ? (
    <LooksTwoIcon onClick={() => setTheme(!theme)} />
  ) : (
    <LooksOneIcon onClick={() => setTheme(!theme)} />
  ); // Icons imported from `@material-ui/icons`
  const appliedTheme = createTheme(theme ? theme1 : theme2);

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route>
            {/* ROUTES HERE */}
            <Route
              path="/analysis"
              element={
                <DrawerLayout themeMode={themeMode}>
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
