// Test Table using mui-datatable

// eslint-disable
import React from "react";
import MUIDataTable from "mui-datatables";
import { TableCell, TableRow } from "@mui/material";

const financeData = [
  {
    id: 1,
    cat_name: "Revenues",
    months: [
      {
        name: "Jan22",
        transfer: 100,
        budget: 50,
        abs: -50,
        pct: "-50%",
      },
      { name: "Feb22", transfer: 200, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 1,
        category_id: 1,
        name: "Revenue Stream 1",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 1,
            subcategory_id: 1,
            number: 3000,
            name: "Umsatzerlöse 1",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 2,
            subcategory_id: 1,
            number: 3002,
            name: "Umsatzerlöse 2",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        category_id: 1,
        name: "Revenue Stream 2",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 3,
            subcategory_id: 2,
            number: 3003,
            name: "Gewinne",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
  // here begins another main category
  {
    id: 2,
    cat_name: "Cost of Sold Goods",
    months: [
      { name: "Jan22", transfer: 300, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 400, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 3,
        category_id: 2,
        name: "COGS 1",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 4,
            subcategory_id: 2,
            number: 3005,
            name: "Irgendwelche Kosten",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 5,
            subcategory_id: 2,
            number: 3010,
            name: "Andere Kosten",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
  // here begins another main category
  {
    id: 3,
    cat_name: "Operating expenses",
    months: [
      { name: "Jan22", transfer: 500, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 600, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 4,
        category_id: 3,
        name: "Employee expenses",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 6,
            subcategory_id: 4,
            number: 4005,
            name: "Gehälter",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 7,
            subcategory_id: 2,
            number: 3050,
            name: "Löhne",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        category_id: 3,
        name: "Marketing",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 8,
            subcategory_id: 5,
            number: 8005,
            name: "TV Werbung",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 9,
            subcategory_id: 5,
            number: 4050,
            name: "Streaming",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function TestTable() {
  // defining columns based on number of months
  const columns = [];
  columns.push("");
  financeData[0].months.map(() => columns.push("Actual", "Budget", "Abs", "%"));
  console.log(columns);

  const data = [
    ["Revenues", "100", "100", "0", "0%", "100", "100", "0", "0%"],
    [
      "Revenue Stream 1",
      "200",
      "100",
      "100",
      "50%",
      "200",
      "100",
      "100",
      "50%",
    ],
    [
      "Cost of Sold Goods",
      "200",
      "300",
      "100",
      "33%",
      "200",
      "300",
      "100",
      "33%",
    ],
    ["COGS", "500", "100", "400", "36%", "500", "100", "400", "36%"],
  ];

  const options = {
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    // define which rows are expandable
    isRowExpandable: (dataIndex) => {
      if (dataIndex === 1 || dataIndex === 3) return false;
      return true;
    },
    // define which rows are expanded from the beginning
    /*  rowsExpanded: [0, 2, 3], */
    renderExpandableRow: (rowData, rowMeta) => {
      return data.map((row) => (
        <TableRow>
          <TableCell />
          {row.map((cell) => (
            <TableCell>{cell}</TableCell>
          ))}
        </TableRow>
      ));
    },
  };

  /*   const data2 = [];
  financeData.map((category) =>
    data2.push([
      category.cat_name,
      category.months.map((month) => month.transfer).join(", "),
    ])
  ); */

  /*  console.log(data2); */
  const components = {
    ExpandButton: function (props) {
      if (props.dataIndex === 3 || props.dataIndex === 4)
        return <div style={{ width: "24px" }} />;
      return <ExpandButton {...props} />;
    },
  };

  return (
    <MUIDataTable
      title="Finance planning"
      data={data}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
