import React, { useState } from "react";
import { Button } from "@mui/material";
import API from "@services/Api";

import * as XLSX from "xlsx/xlsx.mjs";

/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";

XLSX.set_fs(fs);

/* TO DO:
----------
- define what time period to export (fetch data)
- include month data
- name headers dynamically
*/

/*  eslint array-callback-return: 0 */

function ExportTable() {
  // fetch analysis data from db
  const [data, setData] = useState();

  const handleExport = () => {
    API.get("analysis", { from: "Jan2019", to: "Mar2019" }).then((resp) => {
      /* console.log(resp.data); */
      setData(resp.data);
    });

    // reshape fetched data for excel sheet
    const rows = [];
    if (data) {
      rows.push({
        "": "Account",
        Jan2019Actual: "Actual",
        Jan2019Budget: "Budget",
      });
      Object.values(data.categories).map((cat) => {
        rows.push({
          "": cat.name,
        });

        Object.values(data.subcategories).map((subcat) => {
          if (subcat.categoryId === cat.id) {
            rows.push({
              "": subcat.name,
            });

            Object.values(data.datevAccounts).map((datev) => {
              if (datev.subcategoryId === subcat.id) {
                rows.push({
                  "": datev.name,
                  Jan2019Actual: data.transfers.find(
                    (transfer) => transfer.datevAccountId === datev.id
                  ).actual,
                  Jan2019Budget: data.transfers.find(
                    (transfer) => transfer.datevAccountId === datev.id
                  ).budget,
                });
              }
            });
          }
        });
      });
      /* console.log(rows); */
    }

    // download the excel file
    if (rows.length > 0) {
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TestTable");

      /* fix headers of table, this needs to be generated dynamically */
      XLSX.utils.sheet_add_aoa(worksheet, [["Jan 2019", ""]], { origin: "B1" });

      /* create an XLSX file and save as "anyfilename".xlsx */
      XLSX.writeFile(workbook, "TestExport.xlsx");
    }
  };

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  );
}

export default ExportTable;
