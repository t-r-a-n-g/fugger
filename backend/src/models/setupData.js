const datevAccountDefaults = require("../../datev_account_defaults.json");

async function setupData() {
  // eslint-disable-next-line no-restricted-syntax
  console.log(datevAccountDefaults);
}

async function setupDummyData() {
  return null;
}

module.exports = {
  setupData,
  setupDummyData,
};
