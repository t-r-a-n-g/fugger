const datevAccountDefaults = require("../../datev_account_defaults.json");
const DatevAccountDefaults = require("./datevAccountDefaults.model");

function setupData() {
  const promises = [];

  for (const [category, subcategories] of Object.entries(
    datevAccountDefaults
  )) {
    for (const [subcategory, accounts] of Object.entries(subcategories)) {
      for (const account of accounts.accounts) {
        promises.push(
          DatevAccountDefaults.create({
            name: account.name,
            number: account.number,
            category_name: category,
            subcategory_name: subcategory,
          })
        );
      }
    }
  }

  return Promise.all(promises);
}

async function setupDummyData() {
  return null;
}

module.exports = {
  setupData,
  setupDummyData,
};
