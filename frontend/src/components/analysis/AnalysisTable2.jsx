import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AnalysisTable2.css";

// VERSION 2
// recreating a suitable data structure for the response data for mapping the analysis table

const monthsData = ["Jan 2022", "Feb 2022"];

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
      { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
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
      { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
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
      { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
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

function AnalysisTable2() {
  return (
    <Paper sx={{ width: "100", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "90vh" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              {monthsData.map((month) => (
                <>
                  <TableCell colSpan={2} style={{ textAlign: "center" }}>
                    {month}
                  </TableCell>
                  <TableCell colSpan={2} style={{ textAlign: "center" }}>
                    {month} vs. Budget
                  </TableCell>
                </>
              ))}
            </TableRow>
            <TableRow>
              <TableCell />
              {financeData[0].months.map((month) => (
                <>
                  <TableCell key={month.name}>Actual</TableCell>
                  <TableCell key={month.name}>Budget</TableCell>
                  <TableCell key={month.name}>Abs.</TableCell>
                  <TableCell key={month.name}>%</TableCell>
                </>
              ))}
              {/* <TableCell>Actual</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Abs.</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Abs.</TableCell>
              <TableCell>%</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Category rows */}
            {financeData.map((category) => (
              <>
                <TableRow key={category.id}>
                  {/* Category columns */}
                  <TableCell className="category">
                    {category.cat_name}
                  </TableCell>
                  {category.months.map((month) => (
                    <>
                      <TableCell className="category">
                        {month.transfer}
                      </TableCell>
                      <TableCell className="category">{month.budget}</TableCell>
                      <TableCell className="category">{month.abs}</TableCell>
                      <TableCell className="category">{month.pct}</TableCell>
                    </>
                  ))}
                </TableRow>
                {/* Subcategory rows */}
                {category.subcategories.map((subcategory) => (
                  <>
                    <TableRow key={subcategory.id}>
                      {/* Subcategory columns */}
                      <TableCell className="subcategory-desc">
                        {subcategory.name}
                      </TableCell>
                      {subcategory.months.map((month) => (
                        <>
                          <TableCell>{month.transfer}</TableCell>
                          <TableCell>{month.budget}</TableCell>
                          <TableCell>{month.abs}</TableCell>
                          <TableCell>{month.pct}</TableCell>
                        </>
                      ))}
                    </TableRow>
                    {/* Datev Accounts rows */}
                    {subcategory.datev_accounts.map((datevAcc) => (
                      <TableRow key={datevAcc.id}>
                        {/* Datev Account columns */}
                        <Table className="datev-desc-container">
                          <TableCell className="datev-number">
                            {datevAcc.number}
                          </TableCell>
                          <TableCell className="datev-name">
                            {datevAcc.name}
                          </TableCell>
                        </Table>
                        {datevAcc.months.map((month) => (
                          <>
                            <TableCell>{month.transfer}</TableCell>
                            <TableCell>{month.budget}</TableCell>
                            <TableCell>{month.abs}</TableCell>
                            <TableCell>{month.pct}</TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AnalysisTable2;
