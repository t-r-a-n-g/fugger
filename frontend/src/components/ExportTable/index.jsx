import React from "react";
import { Button } from "@mui/material";
import useTableData from "@hooks/useTableData";
import { useTranslation } from "react-i18next";

import * as XLSX from "xlsx-js-style";

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
    const monthsHeaderHelper = [""];
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

    const subHeader = headers[1]
      .slice(1)
      .map((el) => (typeof el === "object" ? el.value : el))
      .map((el) => {
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

      const categoryStyled = catRow.map((el) => {
        if (el > 0)
          return {
            v: el,
            s: {
              fill: { fgColor: { rgb: "819CDB" } },
              font: { bold: true, color: { rgb: "228A3E" } },
              border: { bottom: { style: "thin" }, top: { style: "medium" } },
            },
          };

        if (el < 0)
          return {
            v: el,
            /*   */
            s: {
              fill: { fgColor: { rgb: "819CDB" } },
              font: { bold: true, color: { rgb: "FF0000" } },
              border: { bottom: { style: "thin" }, top: { style: "medium" } },
            },
          };

        return {
          v: el,
          s: {
            fill: { fgColor: { rgb: "819CDB" } },
            font: { bold: true },
            border: { bottom: { style: "thin" }, top: { style: "medium" } },
          },
        };
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
          const subcategoryStyled = subcatRow.map((el) => {
            if (el > 0)
              return {
                v: el,
                s: {
                  fill: { fgColor: { rgb: "D0E5F8" } },
                  font: { bold: true, color: { rgb: "228A3E" } },
                  border: {
                    bottom: { style: "thin" },
                    top: { style: "medium" },
                  },
                },
              };

            if (el < 0)
              return {
                v: el,
                s: {
                  fill: { fgColor: { rgb: "D0E5F8" } },
                  font: { bold: true, color: { rgb: "FF0000" } },
                  border: {
                    bottom: { style: "thin" },
                    top: { style: "medium" },
                  },
                },
              };

            return {
              v: el,
              s: {
                fill: { fgColor: { rgb: "D0E5F8" } },
                font: { bold: true },
                border: { bottom: { style: "thin" }, top: { style: "medium" } },
              },
            };
          });

          rows.push(subcategoryStyled);

          for (const datevAcc of datevRows) {
            const { subcategoryId } = datevAcc;

            if (subcatId === subcategoryId) {
              const datevCellData = datevAcc.cellData;
              const datevRow = Object.values(datevCellData).map((el) =>
                typeof el.value === "number" ? round(el.value) : el.value
              );
              const datevStyled = datevRow.map((el) => {
                if (el > 0)
                  return {
                    v: el,
                    s: {
                      font: { color: { rgb: "228A3E" } },
                    },
                  };

                if (el < 0)
                  return {
                    v: el,
                    s: {
                      font: { color: { rgb: "FF0000" } },
                    },
                  };

                return {
                  v: el,
                };
              });

              rows.push(datevStyled);
            }
          }
        }
      }
    }

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

      /* change width of first column */
      worksheet["!cols"] = [{ wch: 40 }];

      /* merge months cells */
      const mergeCells = [{ s: { r: 0, c: 1 }, e: { r: 0, c: 4 } }];

      let n = 5;
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
