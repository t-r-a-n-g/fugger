const fs = require("fs");
const XLSX = require("xlsx");

// const FILE = "./DATEV_Export.xlsx";
const FILE = "./DATEV_Export.ods";

const workbook = XLSX.readFile(FILE);
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];
const parsedSheet = XLSX.utils.sheet_to_json(worksheet);
const documentHeaders = parsedSheet[0];

function getDeletableHeaderKeys(headers) {
  // We do not need all header keys, so we filter them here

  // Find the last 3 keys and add them to keysToDelete
  const keys = Object.keys(headers);
  let keysToDelete = keys.filter((key, index) => {
    if (index >= keys.length - 3) return true;
    return false;
  });

  keysToDelete = [...keysToDelete, "__EMPTY_1", "__EMPTY_2", "__EMPTY_3"];
  return keysToDelete;
}

for (const k of getDeletableHeaderKeys(documentHeaders)) {
  delete documentHeaders[k];
}

const accounts = [];
for (let i = 1; i < parsedSheet.length; i += 1) {
  const row = parsedSheet[i];
  const columns = Object.entries(row);

  const accountNumber = columns[0][1];
  const accountName = columns[1][1];

  const account = {
    accountNumber,
    accountName,
    transfers: [],
  };

  for (const [index, c] of columns.entries()) {
    const columnHeader = c[0];
    const columnValue = c[1];

    // The column headers are not parsed automatically, so we have to map them to the header names
    const columnName = documentHeaders[columnHeader];
    if (columnName) {
      if (columnName.includes("/")) {
        // columnName is a date in this case (Month/Year)
        const date = columnName;
        const transferAmount = columnValue;
        let finalTransferAmount = null;

        const isRevenue = Object.values(parsedSheet[i])[index + 1] === "H";

        // if we have negative numbers we swap reveue and expenses
        finalTransferAmount = isRevenue ? transferAmount : -transferAmount;

        account.transfers.push({
          date,
          amount: finalTransferAmount,
        });
      }
    }
  }

  if (account.transfers.length > 0) accounts.push(account);
}

fs.writeFile("./datev.json", JSON.stringify(accounts), () => {});
