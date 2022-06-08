// import LoginPage from "@components/authentification/login";
// import SignUp from "@components/authentification/signUp";
import * as React from "react";
import "./App.css";
import FuDataTable from "@components/FuDataTable";

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
            id: 1,
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

function App() {
  return (
    <div>
      {/* <LoginPage /> */}
      {/* <SignUp /> */}
      <FuDataTable headCells={tableHeadCells} data={data} />
    </div>
  );
}

export default App;
