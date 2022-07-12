import React from "react";
import { Button } from "@mui/material";
import useTableData from "@hooks/useTableData";

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
  /*  hook useTableData */
  const { categoryRows, subcategoryRows, datevRows, headers } = useTableData({
    table: "analysis",
  });

  /*  onClick for export */
  const handleExport = () => {
    const rows = [];
    const monthsHeader = [""];

    /* --- HEADERS --- */
    if (headers) {
      const monthsHeaderArray = headers[0].slice(1).map((month) => month.value);
      for (let i = 0; i < monthsHeaderArray.length; i++) {
        monthsHeader.push(monthsHeaderArray[i], "", "", "");
      }

      const subHeaderObject = { 1: "Account" };
      for (let i = 2; i < headers[1].length; i++) {
        if (typeof headers[1][i] !== "object")
          subHeaderObject[i] = headers[1][i];
        else subHeaderObject[i] = headers[1][i].value;
      }

      rows.push(subHeaderObject);
    }

    /* --- CATEGORIES ---  */
    // each array of categoryArray contains the row data for one category
    const categoryArray = [];
    if (categoryRows) {
      for (let i = 0; i < categoryRows.length; i++) {
        categoryArray.push(Object.values(categoryRows[i].cellData));
        categoryArray[i].push({ id: categoryRows[i].id });
      }
    }

    const subcategoryArray = [];
    if (subcategoryRows) {
      for (let i = 0; i < subcategoryRows.length; i++) {
        subcategoryArray.push(Object.values(subcategoryRows[i].cellData));
        subcategoryArray[i].push({ id: subcategoryRows[i].id });
        subcategoryArray[i].push({ categoryId: subcategoryRows[i].categoryId });
      }
    }

    const datevArray = [];
    if (datevRows) {
      for (let i = 0; i < datevRows.length; i++) {
        datevArray.push(Object.values(datevRows[i].cellData));
        datevArray[i].push({ subcategoryId: datevRows[i].subcategoryId });
      }
    }

    if (categoryArray && subcategoryArray && datevArray) {
      for (let i = 0; i < categoryArray.length; i++) {
        const category = {};
        for (let j = 0; j < categoryArray[i].length - 1; j++) {
          category[j + 1] = categoryArray[i][j].value;
        }
        rows.push(category);

        for (let m = 0; m < subcategoryArray.length; m++) {
          if (
            subcategoryArray[m][subcategoryArray[m].length - 1].categoryId ===
            categoryArray[i][categoryArray[i].length - 1].id
          ) {
            const subcategory = {};
            for (let n = 0; n < subcategoryArray[m].length - 2; n++) {
              subcategory[n + 1] = subcategoryArray[m][n].value;
            }
            rows.push(subcategory);

            for (let x = 0; x < datevArray.length; x++) {
              if (
                datevArray[x][datevArray[x].length - 1].subcategoryId ===
                subcategoryArray[m][subcategoryArray[m].length - 2].id
              ) {
                const datev = {};
                for (let y = 0; y < datevArray[x].length - 1; y++) {
                  datev[y + 1] = datevArray[x][y].value;
                }
                rows.push(datev);
              }
            }
          }
        }
      }
    }

    /*  console.log("ROWS: ", rows); */

    // download the excel file
    if (rows.length > 0) {
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Export_Fugger");
      /* fix headers of table, this needs to be generated dynamically */
      XLSX.utils.sheet_add_aoa(worksheet, [monthsHeader], {
        origin: "A1",
      });

      /* create an XLSX file and save as "anyfilename".xlsx */
      XLSX.writeFile(
        workbook,
        `Export_${monthsHeader[1]}-${
          monthsHeader[monthsHeader.length - 4]
        }.xlsx`
      );
    }
  };

  return (
    <Button variant="contained" onClick={handleExport}>
      Export
    </Button>
  );
}

export default ExportTable;
