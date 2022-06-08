import * as React from "react";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUp from "@components/authentification/signUp";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <LoginPage />
      <SignUp />
    </div>
  );
}

export default App;
