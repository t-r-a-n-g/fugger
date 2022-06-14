import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@components/authentification/login";
import SignUpPage from "@components/authentification/signUp";
import { createTheme, ThemeProvider } from "@mui/material";
import AnalysisTable from "@components/Datatable/AnalysisTable";

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
      { id: 1, label: "Actual", name: "actual" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 3,
    label: "Feb22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Actual", name: "actual" },
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
      { id: 1, label: "Actual", name: "actual" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 5,
    label: "Apr22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Actual", name: "actual" },
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
      { id: 1, label: "Actual", name: "actual" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 7,
    label: "Jun22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Actual", name: "actual" },
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
      { id: 1, label: "Actual", name: "actual" },
      { id: 2, label: "Budget", name: "budget" },
      { id: 3, label: "Abs", name: "abs" },
      { id: 4, label: "%", name: "perct" },
    ],
  },
  {
    id: 9,
    label: "Aug22",
    name: "months.Feb22",
    children: [
      { id: 1, label: "Actual", name: "actual" },
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
        actual: 110000,
        perct: 10,
      },

      Feb22: {
        budget: 200000,
        actual: 20000,
        perct: 20,
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
            actual: 50000,
            perct: 50,
          },

          Feb22: {
            budget: 50000,
            actual: 25000,
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
                actual: 50000,
                perct: 50,
              },

              Feb22: {
                budget: 30000,
                actual: 17000,
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/analysis" element={<AnalysisTable />} />
          {/* <Route
            path="/analysis"
            element={<FuDataTable headCells={tableHeadCells} data={data} />}
          /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
