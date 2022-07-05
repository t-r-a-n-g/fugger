const XLSX = require("xlsx");

class DatevParser {
  constructor(file) {
    this.file = file;
    this.deletableHeaderKeys = ["__EMPTY_1", "__EMPTY_2", "__EMPTY_3"];
    this.deletableHeaderFromEndIndex = 3;
  }

  getDeletableHeaderKeys(headers) {
    // We do not need all header keys, so we filter them here

    // Find the last 3 keys and add them to keysToDelete
    const keys = Object.keys(headers);
    let keysToDelete = keys.filter((key, index) => {
      if (index >= keys.length - this.deletableHeaderFromEndIndex) return true;
      return false;
    });

    keysToDelete = [...keysToDelete, ...this.deletableHeaderKeys];
    return keysToDelete;
  }

  getHeaders(jsonSheet) {
    const headers = jsonSheet[0];

    for (const k of this.getDeletableHeaderKeys(headers)) {
      delete headers[k];
    }

    return headers;
  }

  parseFinancialExportSheet(jsonSheet) {
    const headers = this.getHeaders(jsonSheet);
    const accounts = [];

    for (let i = 1; i < jsonSheet.length; i += 1) {
      const row = jsonSheet[i];
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
        const columnName = headers[columnHeader];
        if (columnName) {
          if (columnName.includes("/")) {
            // columnName is a date in this case (Month/Year)
            const date = columnName;
            const transferAmount = columnValue;
            let finalTransferAmount = null;

            if (transferAmount === null) {
              finalTransferAmount = 0;
            } else {
              // const isSoll = Object.values(row)[index + 1] === "S";
              const isHaben = Object.values(row)[index + 2] === "H";

              // if we have negative numbers we swap revenue and expenses
              finalTransferAmount = isHaben ? transferAmount : -transferAmount;
            }
            account.transfers.push({
              date,
              amount: finalTransferAmount,
            });
          }
        }
      }

      if (account.transfers.length > 0) accounts.push(account);
    }

    return accounts;
  }

  parseFinancialExportFile() {
    return new Promise((resolve, reject) => {
      try {
        const workbook = XLSX.readFile(this.file);
        const parsedSheets = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonSheet = XLSX.utils.sheet_to_json(worksheet, {
            defval: null,
          });
          parsedSheets.push(...this.parseFinancialExportSheet(jsonSheet));
        });

        resolve(parsedSheets);
      } catch (err) {
        reject(err);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  parseCategorySheet(jsonSheet) {
    const categories = {};

    for (let i = 1; i < jsonSheet.length; i += 1) {
      const row = jsonSheet[i];
      const columns = Object.entries(row);

      const type = columns[3][1];
      if (type === "G+V") {
        const accountNumber = columns[0][1];
        const accountName = columns[1][1];

        const hasSubCategory = columns.length > 5;
        const categoryName = hasSubCategory ? columns[5][1] : columns[4][1];
        const subCategoryName = hasSubCategory ? columns[4][1] : accountName;

        if (!categories[categoryName]) categories[categoryName] = {};
        if (!categories[categoryName][subCategoryName])
          categories[categoryName][subCategoryName] = { accounts: [] };

        categories[categoryName][subCategoryName].accounts.push({
          name: accountName,
          number: accountNumber,
        });
      }
    }

    return categories;
  }

  parseCategoryFile(sheetName = "accounts_DATEV") {
    const workbook = XLSX.readFile(this.file);
    const worksheet = workbook.Sheets[sheetName];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet);

    return this.parseCategorySheet(jsonSheet);
  }
}
module.exports = DatevParser;
