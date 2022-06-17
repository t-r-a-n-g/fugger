import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import Analysis from "@components/Analysis";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@components/themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route>
            {/* ROUTES HERE */}
            <Route
              path="/analysis"
              element={
                <DrawerLayout>
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
