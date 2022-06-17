import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import FuDataTable from "@components/FuDataTable";
import DrawerLayout from "@components/DrawerLayout/DrawerLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    // Name of the component
    MuiDrawer: {
      styleOverrides: {
        // Name of the slot
        paper: {
          // Some CSS
          color: "rgba(255,255,255, 0.6)",
          backgroundColor: "#7C179F",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#342F35",
          backgroundColor: "#FCFCFC",
          height: "50px",
        },
      },
    },
  },
});
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
                  <FuDataTable headCells={tableHeadCells} data={data} />
                </DrawerLayout>
              }
            ></Route>
            {/* END OF ROUTES */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
