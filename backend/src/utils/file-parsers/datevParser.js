const XLSX = require("xlsx");

class DatevParser {
  constructor(file) {
    this.file = file;
    this.deletableHeaderKeys = [];
    this.deletableHeaderFromEndIndex = 0;
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

  // eslint-disable-next-line class-methods-use-this
  isMonthlyExportFile(jsonSheet) {
    const headerKeys = Object.keys(jsonSheet[0]);

    const isMonthly =
      headerKeys[0].includes("pro Monat") || headerKeys.length === 12;
    const isYearly =
      headerKeys[0].includes("Jahresübersicht") || headerKeys.length === 44;

    // double check, just in case...
    if (isMonthly !== isYearly) return isMonthly;

    return null;
  }

  parseMonthlyFincancialExportSheet(jsonSheet) {
    this.deletableHeaderKeys = [
      "__EMPTY_1",
      "__EMPTY_2",
      "__EMPTY_3",
      "__EMPTY_4",
      "__EMPTY_5",
      "__EMPTY_6",
    ];
    this.deletableHeaderFromEndIndex = 2;

    const headers = this.getHeaders(jsonSheet);
    const accounts = [];

    const sollHeader = Object.keys(headers).reverse()[1];

    const month = headers[sollHeader]
      .replace("Soll", "")
      .replace(" ", "/")
      .trim();

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

      columns.reverse();
      const habenCol = columns[0];
      const sollCol = columns[1];

      const trsfValue = Number(habenCol[1]) - Number(sollCol[1]);
      account.transfers.push({
        date: month,
        amount: Math.abs(trsfValue),
        type: trsfValue < 0 ? "S" : "H",
      });

      if (trsfValue !== 0) accounts.push(account);
    }

    return accounts;
  }

  parseYearlyFinancialExportSheet(jsonSheet) {
    this.deletableHeaderKeys = ["__EMPTY_1", "__EMPTY_2", "__EMPTY_3"];
    this.deletableHeaderFromEndIndex = 3;

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
            const isHaben = Object.values(row)[index + 2] === "H";

            account.transfers.push({
              date,
              amount: transferAmount,
              type: isHaben ? "H" : "S",
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

          const isMonthly = this.isMonthlyExportFile(jsonSheet);

          if (isMonthly === null)
            reject(new Error("Unable to determine monthly/yearly sheet"));

          if (isMonthly) {
            parsedSheets.push(
              ...this.parseMonthlyFincancialExportSheet(jsonSheet)
            );
          } else {
            parsedSheets.push(
              ...this.parseYearlyFinancialExportSheet(jsonSheet)
            );
          }
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
