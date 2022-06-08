import * as React from "react";
import DataTable from "@components/DataTable";
import ResponsiveDrawer from "@components/drawer/Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const tableHeadCells = [
  {
    id: 1,
    label: "",
    children: [
      { id: 1, label: "Account Number", name: "accountNumber" },
      { id: 2, label: "Account", name: "accountName" },
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
];

const data = [
  {
    id: 1,
    accountName: "Revenues",

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
            accountName: "Umsatzerlöse 1",
            accountNumber: 1234,

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
      <ResponsiveDrawer />
      <DataTable headCells={tableHeadCells} data={data} />;
    </ThemeProvider>
  );
}

export default App;
