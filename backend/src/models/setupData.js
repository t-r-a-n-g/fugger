const datevAccountDefaults = require("../../../dev/data/datev_account_defaults.json");
const DatevAccountDefaults = require("./datevAccountDefaults.model");

const User = require("./user.model");

function setupData() {
  const promises = [];

  for (const [category, subcategories] of Object.entries(
    datevAccountDefaults
  )) {
    let order = 0;
    for (const [subcategory, accounts] of Object.entries(subcategories)) {
      if (subcategory === "order")
        order = accounts;
      else {
        for (const account of accounts.accounts) {
          const obj = {
            name: account.name,
            number: account.number,
            category_name: category,
            category_order: order,
            subcategory_name: subcategory,
          }
          promises.push(
            DatevAccountDefaults.create(obj)
          );
        }
      }
    }
  }

  return Promise.all(promises);
}

async function setupDummyData() {
  const user = await User.create({
    firstname: "Hans",
    lastname: "Wurst",
    email: "hans.wurst@salami.de",
    password: "mortadella",
    language: "en-EN",
  });

  return { user };
}

module.exports = {
  setupData,
  setupDummyData,
};
