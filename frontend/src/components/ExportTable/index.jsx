import React from "react";
import { Button } from "@mui/material";
import useTableData from "@hooks/useTableData";
import { useTranslation } from "react-i18next";

import * as XLSX from "xlsx-js-style";

/* eslint array-callback-return: 0 */

function ExportTable() {
  const { t } = useTranslation();

  const { categoryRows, subcategoryRows, datevRows, headers } = useTableData({
    table: "analysis",
  });

  function round(num) {
    if (Number.isNaN(num)) return NaN;

    const m = Number(num * 100).toPrecision(15);
    const rounded = Math.round(m) / 100;

    return Number.isNaN(rounded) ? 0 : rounded;
  }

  const handleExport = () => {
    const rows = [];

    /* TABLE HEADERS */
    const monthsHeaderHelper = ["", ""];
    const monthsArray = headers[0].slice(1).map((month) => month.value);
    for (let i = 0; i < monthsArray.length; i++) {
      monthsHeaderHelper.push(monthsArray[i], "", "", "");
    }
    const monthsHeader = monthsHeaderHelper.map((el) => {
      return {
        v: el,
        s: {
          fill: { color: { rgb: "000000" } },
          font: { bold: true, color: { rgb: "FFFFFF" } },
        },
      };
    });

    const subHeaderArray = headers[1]
      .slice(1)
      .map((el) => (typeof el === "object" ? el.value : el));
    subHeaderArray.unshift("");

    const subHeader = subHeaderArray.map((el) => {
      return {
        v: el,
        s: {
          fill: { color: { rgb: "000000" } },
          font: { bold: true, color: { rgb: "FFFFFF" } },
          border: { bottom: { style: "medium", color: { rgb: "FFFFFF" } } },
        },
      };
    });

    rows.push(monthsHeader, subHeader);

    /* TABLE BODY, TO DO: change fill color */

    for (const category of categoryRows) {
      const { id } = category;
      const { cellData } = category;

      const catRow = Object.values(cellData).map((el) =>
        typeof el.value === "number" ? round(el.value) : el.value
      );
      catRow.unshift("");

      // creating the final styled array for excel export
      const categoryStyled = [
        {
          v: catRow[0],
          t: "s",
          s: {
            fill: { fgColor: { rgb: "819CDB" } },
            font: { bold: true },
            border: { bottom: { style: "thin" }, top: { style: "medium" } },
          },
        },
        {
          v: catRow[1],
          t: "s",
          s: {
            fill: { fgColor: { rgb: "819CDB" } },
            font: { bold: true },
            border: { bottom: { style: "thin" }, top: { style: "medium" } },
          },
        },
      ];

      catRow.slice(2).map((el) => {
        if (el > 0)
          categoryStyled.push({
            v: el,
            t: "n",
            s: {
              fill: { fgColor: { rgb: "819CDB" } },
              font: { bold: true, color: { rgb: "228A3E" } },
              border: { bottom: { style: "thin" }, top: { style: "medium" } },
            },
          });

        if (el < 0)
          categoryStyled.push({
            v: el,
            t: "n",
            s: {
              fill: { fgColor: { rgb: "819CDB" } },
              font: { bold: true, color: { rgb: "FF0000" } },
              border: { bottom: { style: "thin" }, top: { style: "medium" } },
            },
          });

        if (el === 0 || typeof el === "string")
          categoryStyled.push({
            v: el,
            s: {
              fill: { fgColor: { rgb: "819CDB" } },
              font: { bold: true },
              border: { bottom: { style: "thin" }, top: { style: "medium" } },
              alignment: { horizontal: "right" },
            },
          });
      });

      rows.push(categoryStyled);

      for (const subcategory of subcategoryRows) {
        const { categoryId } = subcategory;
        const subcatId = subcategory.id;

        if (id === categoryId) {
          const subcatCellData = subcategory.cellData;

          const subcatRow = Object.values(subcatCellData).map((el) =>
            typeof el.value === "number" ? round(el.value) : el.value
          );
          subcatRow.unshift("");

          // creating the final styled array for excel export
          const subcategoryStyled = [
            {
              v: subcatRow[0],
              t: "s",
              s: {
                fill: { fgColor: { rgb: "D0E5F8" } },
                font: { bold: true },
                border: {
                  bottom: { style: "thin" },
                  top: { style: "medium" },
                },
              },
            },
            {
              v: subcatRow[1],
              t: "s",
              s: {
                fill: { fgColor: { rgb: "D0E5F8" } },
                font: { bold: true },
                border: {
                  bottom: { style: "thin" },
                  top: { style: "medium" },
                },
              },
            },
          ];

          subcatRow.slice(2).map((el) => {
            if (el > 0)
              subcategoryStyled.push({
                v: el,
                t: "n",
                s: {
                  fill: { fgColor: { rgb: "D0E5F8" } },
                  font: { bold: true, color: { rgb: "228A3E" } },
                  border: {
                    bottom: { style: "thin" },
                    top: { style: "medium" },
                  },
                },
              });

            if (el < 0)
              subcategoryStyled.push({
                v: el,
                t: "n",
                s: {
                  fill: { fgColor: { rgb: "D0E5F8" } },
                  font: { bold: true, color: { rgb: "FF0000" } },
                  border: {
                    bottom: { style: "thin" },
                    top: { style: "medium" },
                  },
                },
              });

            if (el === 0 || typeof el === "string")
              subcategoryStyled.push({
                v: el,
                s: {
                  fill: { fgColor: { rgb: "D0E5F8" } },
                  font: { bold: true },
                  border: {
                    bottom: { style: "thin" },
                    top: { style: "medium" },
                  },
                  alignment: { horizontal: "right" },
                },
              });
          });

          rows.push(subcategoryStyled);

          for (const datevAcc of datevRows) {
            const { subcategoryId } = datevAcc;
            const datevId = datevAcc.id;

            if (subcatId === subcategoryId) {
              const datevCellData = datevAcc.cellData;
              const datevRow = Object.values(datevCellData).map((el) =>
                typeof el.value === "number" ? round(el.value) : el.value
              );

              datevRow.unshift(
                datevCellData[`datevAccount-${datevId}-name`].accNumber
              );

              // creating the final styled array for excel export
              const datevStyled = [
                {
                  v: datevRow[0],
                  t: "s",
                },
                {
                  v: datevRow[1],
                  t: "s",
                },
              ];

              datevRow.slice(2).map((el) => {
                if (el > 0)
                  datevStyled.push({
                    v: el,
                    t: "n",
                    s: {
                      font: { color: { rgb: "228A3E" } },
                    },
                  });

                if (el < 0)
                  datevStyled.push({
                    v: el,
                    t: "n",
                    s: {
                      font: { color: { rgb: "FF0000" } },
                    },
                  });

                if (el === 0 || typeof el === "string")
                  datevStyled.push({
                    v: el,
                    s: { alignment: { horizontal: "right" } },
                  });
              });

              rows.push(datevStyled);
            }
          }
        }
      }
    }
    /*  console.log("datev: ", datevRows); */
    /*    console.log("subcat: ", subcategoryRows); */
    /*   console.log("ROWS: ", rows); */

    // download the excel file
    if (rows.length > 0) {
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        `${monthsArray[0]} - ${monthsArray[monthsArray.length - 1]}`
      );

      /* change width of first and second column */
      worksheet["!cols"] = [{ wch: 5 }, { wch: 40 }];

      /* merge months cells */
      const mergeCells = [{ s: { r: 0, c: 2 }, e: { r: 0, c: 5 } }];

      let n = 6;
      for (let i = 0; i < monthsArray.length; i++) {
        mergeCells.push({ s: { r: 0, c: n }, e: { r: 0, c: n + 3 } });
        n += 4;
      }

      worksheet["!merges"] = mergeCells;

      /* create an XLSX file and save as "anyfilename".xlsx */
      XLSX.writeFile(
        workbook,
        `Export_${monthsArray[0]}-${monthsArray[monthsArray.length - 1]}.xlsx`
      );
    }
  };

  return (
    <Button
      sx={{ marginTop: 3, marginLeft: 2 }}
      variant="contained"
      onClick={handleExport}
    >
      {t("export-table")}
    </Button>
  );
}

export default ExportTable;
