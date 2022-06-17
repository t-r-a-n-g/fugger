const datevAccountDefaults = require("../../datev_account_defaults.json");
const DatevAccountDefaults = require("./datevAccountDefaults.model");

const User = require("./user.model");

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
