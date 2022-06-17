import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import FuDataTable from "@components/FuDataTable";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme1, theme2 } from "@components/themes";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";

const tableHeadCells = [
  {
    id: 1,
    label: "",
    children: [
      //  { id: 1, label: "Account Number", name: "accountNumber" },
      { id: 2, label: "", name: "accountName" },
    ],
  },
  {
    id: 2,
    label: "Jan22",
    name: "months.Jan22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "budget" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 3,
    label: "Feb22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 4,
    label: "Mar22",
    name: "months.Jan22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "budget" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 5,
    label: "Apr22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 6,
    label: "May22",
    name: "months.Jan22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "budget" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 7,
    label: "Jun22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 8,
    label: "Jul22",
    name: "months.Jan22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "budget" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 9,
    label: "Aug22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Transfer", name: "transfer" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
];

const data = [
  {
    id: 1,
    accountName: "Revenues",
    type: "category",

    months: {
      Jan22: {
        budget: 100000,
        transfer: 50000,
        abs: 50000,
        perct: 50,
      },

      Feb22: {
        budget: 50000,
        transfer: 25000,
        abs: 25000,
        perct: 50,
      },
    },

    children: [
      {
        id: 1,
        accountName: "Revenue Stream 1",
        type: "subcategory",

        months: {
          Jan22: {
            budget: 100000,
            transfer: 50000,
            abs: 50000,
            perct: 50,
          },

          Feb22: {
            budget: 50000,
            transfer: 25000,
            abs: 25000,
            perct: 50,
          },
        },

        children: [
          {
            id: 1,
            accountName: "Umsatzerlöse 1",
            accountNumber: 1234,
            type: "datev_account",

            months: {
              Jan22: {
                budget: 100000,
                transfer: 50000,
                abs: 50000,
                perct: 50,
              },

              Feb22: {
                budget: 50000,
                transfer: 25000,
                abs: 25000,
                perct: 50,
              },
            },
          },
        ],
      },
    ],
  },
];
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
                  <FuDataTable headCells={tableHeadCells} data={data} />
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
