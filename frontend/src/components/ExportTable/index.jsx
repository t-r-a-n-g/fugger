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
- include abs and pct calculation
- adjust cell width
*/

/*  eslint array-callback-return: 0 */

function ExportTable() {
  /*  functions for calculating abs and pct */
  function round(num) {
    const m = Number((Math.abs(num) * 100).toPrecision(15));
    const rounded = (Math.round(m) / 100) * Math.sign(num);

    return Number.isNaN(rounded) ? 0 : rounded;
  }

  function selectTransferData(transfer) {
    let transferAbs = null;

    if (transfer.type === "S") {
      transferAbs = transfer.budget - transfer.actual;
    } else {
      transferAbs = transfer.actual - transfer.budget;
    }

    let transferPerct = null;
    if (transfer.budget > 0)
      transferPerct = (transferAbs / transfer.budget) * 100;
    else transferPerct = transfer.type === "H" ? 100 : -100;

    return {
      abs: round(transferAbs),
      perct: round(transferPerct),
      actual: round(transfer.actual),
      budget: round(transfer.budget),
    };
  }

  /*  onClick for export */
  const [data, setData] = useState();

  const handleExport = () => {
    API.get("analysis", { from: "Jan2019", to: "Mar2019" }).then((resp) => {
      /* console.log(resp.data); */
      setData(resp.data);
    });

    if (data) {
      for (const transfer of data.transfers) {
        if (transfer.budget) {
          transfer.abs = selectTransferData(transfer).abs;
          transfer.perct = selectTransferData(transfer).perct;
        } else {
          transfer.abs = undefined;
          transfer.perct = undefined;
        }
      }
    }

    // reshape fetched data for excel sheet
    const rows = [];
    if (data) {
      rows.push(
        // headers
        {
          "": "Account",
          Jan2019Actual: "Actual",
          Jan2019Budget: "Budget",
          Jan2019Abs: "Absolute",
          Jan2019Perct: "Percentage",
        }
      );

      // categories rows
      Object.values(data.categories).map((cat) => {
        rows.push({
          "": cat.name,
        });

        // subcategories rows
        Object.values(data.subcategories).map((subcat) => {
          let subcatActual = 0;
          let subcatBudget = 0;
          let subcatAbs = 0;
          let subcatPerct = 0;

          Object.values(data.datevAccounts).map((datev) => {
            if (datev.subcategoryId === subcat.id) {
              const transfer = data.transfers.find(
                (transferRow) => transferRow.datevAccountId === datev.id
              );
              subcatActual += transfer.actual;
              if (transfer.budget) subcatBudget += transfer.budget;
              if (transfer.abs) subcatAbs += transfer.abs;
              if (transfer.perct) subcatPerct += transfer.perct;
            }
          });

          if (subcat.categoryId === cat.id) {
            rows.push({
              "": subcat.name,
              Jan2019Actual: subcatActual,
              Jan2019Budget: subcatBudget,
              Jan2019Abs: subcatAbs,
              Jan2019Perct: subcatPerct,
            });

            // datev accounts rows
            Object.values(data.datevAccounts).map((datev) => {
              if (datev.subcategoryId === subcat.id) {
                const transfer = data.transfers.find(
                  (transferRow) => transferRow.datevAccountId === datev.id
                );

                rows.push({
                  "": datev.name,
                  Jan2019Actual: transfer.actual,
                  Jan2019Budget: transfer.budget,
                  Jan2019Abs: transfer.abs,
                  Jan2019Perct: transfer.perct,
                });
              }
            });
          }
        });
      });
    }
    /* console.log(rows); */

    // download the excel file
    if (rows.length > 0) {
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TestTable");

      /* fix headers of table, this needs to be generated dynamically */
      XLSX.utils.sheet_add_aoa(worksheet, [["Jan 2019", "", "", ""]], {
        origin: "B1",
      });

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
