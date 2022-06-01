import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AnalysisTable.css";

// recreating a suitable data structure for the response data for mapping the analysis table

const data = [
  [
    { cat_name: "Revenues" },
    {
      transfer_jan22: 100,
    },
    { budget_jan22: 100 },
    { transfer_feb22: 200 },
    { budget_feb22: 400 },
    [
      { subcat_name: "Revenue Stream 1" },
      {
        transfer_jan22: 100,
      },
      { budget_jan22: 100 },
      { transfer_feb22: 200 },
      { budget_feb22: 400 },
      [
        { datev_number: 3000 },
        { datev_name: "Umsatzerlöse" },
        {
          transfer_jan22: 100,
        },
        { budget_jan22: 100 },
        { transfer_feb22: 200 },
        { budget_feb22: 400 },
      ],
      [
        { datev_number: 3000 },
        { datev_name: "Umsatzerlöse" },
        {
          transfer_jan22: 100,
        },
        { budget_jan22: 100 },
        { transfer_feb22: 200 },
        { budget_feb22: 400 },
      ],
    ],
    [
      { subcat_name: "Revenue Stream 2" },
      {
        transfer_jan22: 100,
      },
      { budget_jan22: 100 },
      { transfer_feb22: 200 },
      { budget_feb22: 400 },
    ],
  ],

  [
    { cat_name: "Cost of Sold Goods" },
    {
      transfer_jan22: 100,
    },
    { budget_jan22: 100 },
    { transfer_feb22: 200 },
    { budget_feb22: 400 },
    [
      { subcat_name: "COGS1" },
      {
        transfer_jan22: 100,
      },
      { budget_jan22: 100 },
      { transfer_feb22: 200 },
      { budget_feb22: 400 },
      [
        { datev_number: 3000 },
        { datev_name: "Kosten" },
        {
          transfer_jan22: 100,
        },
        { budget_jan22: 100 },
        { transfer_feb22: 200 },
        { budget_feb22: 400 },
      ],
      [
        { datev_number: 3000 },
        { datev_name: "Kosten" },
        {
          transfer_jan22: 100,
        },
        { budget_jan22: 100 },
        { transfer_feb22: 200 },
        { budget_feb22: 400 },
      ],
    ],
    [
      { subcat_name: "COGS2" },
      {
        transfer_jan22: 100,
      },
      { budget_jan22: 100 },
      { transfer_feb22: 200 },
      { budget_feb22: 400 },
    ],
  ],
  [
    { cat_name: "Operating Expenses" },
    {
      transfer_jan22: 100,
    },
    { budget_jan22: 100 },
    { transfer_feb22: 200 },
    { budget_feb22: 400 },
  ],
];

/* TO DO:
    - Include comparison fields
    - Map headers (actual, budget, months)
    - Implement account numbers
    - Implement collapsing / expanding fields
    - Fix sticky header
    - give other keys when mapping^
    - make fields editable

*/

function AnalysisTable() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "90vh" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              {/* this should somehow be mapped too */}
              <TableCell colSpan={2} style={{ textAlign: "center" }}>
                Jan 2022
              </TableCell>
              <TableCell colSpan={2} style={{ textAlign: "center" }}>
                Feb 2022
              </TableCell>
            </TableRow>
            <TableRow>
              {/* this should somehow be mapped too */}
              <TableCell />
              <TableCell>Actual</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Nested mapping of Categories */}
            {data.map((cat) => (
              <>
                <TableRow key={cat.name}>
                  {cat
                    .filter((element) => Object.keys(element).length === 1)
                    .map((element) => (
                      <TableCell style={{ fontWeight: "bold", fontSize: 15 }}>
                        {Object.values(element)}
                      </TableCell>
                    ))}
                </TableRow>

                {/* Nested mapping of Subcategories */}
                {cat
                  .filter((element) => Object.keys(element).length > 1)
                  .map((subcat) => (
                    <>
                      <TableRow key={subcat.name}>
                        <TableCell style={{ paddingLeft: 45, margin: 0 }}>
                          {Object.values(subcat[0])}
                        </TableCell>
                        {subcat
                          .slice(1)
                          .filter(
                            (element) => Object.keys(element).length === 1
                          )
                          .map((element) => (
                            <TableCell>{Object.values(element)}</TableCell>
                          ))}
                      </TableRow>

                      {/* Nested mapping of Datev Accounts */}
                      {subcat
                        .filter((element) => Object.keys(element).length > 1)
                        .map((datev) => (
                          <TableRow key={datev.name}>
                            <Table>
                              <TableCell
                                style={{
                                  width: 40,
                                  paddingRight: 0,
                                  paddingLeft: 70,
                                }}
                              >
                                {Object.values(datev[0])}
                              </TableCell>
                              <TableCell style={{ paddingLeft: 0 }}>
                                {Object.values(datev[1])}
                              </TableCell>
                            </Table>
                            {datev.slice(2).map((element) => (
                              <TableCell>{Object.values(element)}</TableCell>
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

export default AnalysisTable;
