import React from "react";
import { Button } from "@mui/material";
import useTableData from "@hooks/useTableData";

import * as XLSX from "xlsx-js-style";

/* load 'fs' for readFile and writeFile support */
/* import * as fs from "fs";

XLSX.set_fs(fs); */

/* TO DO:
----------
- adjust cell width
- add styling if possible
*/

function ExportTableTest() {
  /*  hook useTableData */
  const { /* categoryRows, subcategoryRows, datevRows,  */ headers } =
    useTableData({
      table: "analysis",
    });

  /*  onClick for export */
  const handleExport = () => {
    const rows = [];

    /* HEADERS */
    const monthsHeaderHelper = [""];
    const monthsArray = headers[0].slice(1).map((month) => month.value);
    for (let i = 0; i < monthsArray.length; i++) {
      monthsHeaderHelper.push(monthsArray[i], "", "", "");
    }
    const monthsHeader = monthsHeaderHelper.map((el) => {
      return { v: el, t: "s", s: { font: { bold: true } } };
    });

    const subHeader = headers[1]
      .slice(1)
      .map((el) => (typeof el === "object" ? el.value : el))
      .map((el) => {
        return { v: el, t: "s", s: { font: { bold: true } } };
      });

    rows.push(monthsHeader, subHeader);

    /* CATEGORIES */
    /*  console.log("Categories: ", categoryRows); */

    /*  console.log(rows); */

    // download the excel file
    if (rows.length > 0) {
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      /* console.log("worksheet: ", worksheet); */
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Export_Fugger");
      /* define headers of table */
      /* XLSX.utils.sheet_add_aoa(worksheet, [monthsHeader], {
        origin: "A1",
      });
 */
      /* create an XLSX file and save as "anyfilename".xlsx */
      /* XLSX.writeFile(
        workbook,
        `Export_${monthsHeader[1]}-${
          monthsHeader[monthsHeader.length - 4]
        }.xlsx`
      ); */
    }
  };

  return (
    <Button variant="contained" onClick={handleExport}>
      Export with styles
    </Button>
  );
}

export default ExportTableTest;
