const DatevParser = require("./datevParser");

const parser = new DatevParser("/home/max/Downloads/DATEV_Export2.xlsx");

parser.parseFinancialExportFile().then((data) => {
  for (const trsf of data[0].transfers) {
    console.warn(trsf);
  }
});
