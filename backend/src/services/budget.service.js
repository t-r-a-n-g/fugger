const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Budget, Category, Subcategory, DatevAccount } = require("../models");

const DatevService = require("./datev.service");

const { ValueError, NotFoundError } = require("../exceptions");

const parseDate = require("../utils/dateParser");

class BudgetService {
  static async getBudgets(from, to, userId) {
    const budgets = await Budget.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
        userId,
      },
      include: [
        { model: DatevAccount, as: "datevAccount" },
        { model: Category },
        { model: Subcategory },
      ],

      order: [["date", "ASC"], [sequelize.literal("category.order_num = 0, category.order_num")]], 
      raw: true,
      nest: true,
    });

    return budgets;
  }

  static async createBudgets(budgets, userId) {
    const datevAccounts = await DatevService.getUserAccounts(userId);
    const dbBudgets = [];
    const updatedOrCreatedBudgets = [];
    for (const budgetInput of budgets) {
      // looking for the respective datev account which user defined budget for
      const budgetDatevAccount = datevAccounts.find((el) => {
        return el.id === budgetInput.account.id;
      });

      // parse amount and date for correct format
      const parsedAmount = Number.parseFloat(budgetInput.amount);
      if (Number.isNaN(parsedAmount) || parsedAmount < 0)
        throw new ValueError();

      const parsedDate = parseDate(budgetInput.date);

      // check if budget entry already exists in db
      const budgetEntry = await Budget.findOne({
        where: {
          datevAccountId: budgetInput.account.id,
          date: parsedDate.date,
          userId,
        },
      });

      // create new budgets
      if (budgetDatevAccount && !budgetEntry) {
        dbBudgets.push({
          categoryId: budgetDatevAccount.subcategory.category.id,
          subcategoryId: budgetDatevAccount.subcategory.id,
          datevAccountId: budgetDatevAccount.id,
          amount: parsedAmount,
          date: parsedDate.date,
          userId,
        });
      }
    }

    updatedOrCreatedBudgets.push(
      Budget.bulkCreate(dbBudgets, { updateOnDuplicate: ["amount"] })
    );

    return updatedOrCreatedBudgets;
  }

  static async createBudget(amount, date, datevAccountId, userId) {
    const datevAccount = await DatevService.getUserAccount(
      userId,
      datevAccountId
    );
    if (!datevAccount)
      throw new NotFoundError(
        `Datev account with id ${datevAccountId} not found in user ${userId}`
      );

    const parsedAmount = Math.abs(amount);
    if (!parsedAmount) throw new ValueError(`${amount} is not a valid number`);

    const parsedDate = parseDate(date);
    if (!parsedDate) throw new ValueError(`Unable to parse date ${date}`);

    return Budget.create({
      categoryId: datevAccount.subcategory.category.id,
      subcategoryId: datevAccount.subcategory.id,
      datevAccountId: datevAccount.id,
      amount: parsedAmount,
      date: parsedDate.date,
      userId,
    });
  }

  static async updateBudget(budgetId, userId, amount) {
    const budget = await Budget.findOne({ where: { id: budgetId, userId } });
    if (!budget) throw new NotFoundError();

    const parsedAmount = Number.parseFloat(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount < 0) throw new ValueError();

    return budget.update({ amount: parsedAmount });
  }
}

module.exports = BudgetService;
