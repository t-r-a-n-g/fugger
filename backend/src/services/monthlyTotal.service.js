const sequelize = require("sequelize");
const { Op } = require("sequelize");

const {
  Category,
  Subcategory,
  DatevAccount,
  Transfer,
  Budget,
} = require("../models");

const typeModels = {
  category: Category,
  subcategory: Subcategory,
  datev: DatevAccount,
};

class MonthlyTotalService {
  static async totalSums(type, { parentId, userId }, parentIdName, from, to) {
    const model = typeModels[type];
    if (!model)
      throw new Error(`Invalid type ${type} specified in MonthlyTotalService`);

    const opts = {
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      attributes: [
        "date",
        parentIdName,
        [sequelize.fn("sum", sequelize.col("amount")), "total"], // sum all values in column "amount" and return it as "total"
      ],
      group: ["date", parentIdName],
      order: [["date", "ASC"]],
      raw: true,
    };

    if (userId) opts.where.userId = userId;
    else if (parentId) opts.where[parentIdName] = parentId;

    const totalTransfers = await Transfer.findAll(opts);
    const totalBudgets = await Budget.findAll(opts);

    const results = {};

    // we need two loops to also add budgets when there are no transfers and vice versa
    for (const transfer of totalTransfers) {
      const key = `${type}-${transfer[parentIdName]}`;
      if (!results[key]) results[key] = {};

      results[key][transfer.date.getTime()] = {
        [parentIdName]: transfer[parentIdName],
        date: transfer.date,
        actual: transfer.total,
        budget: 0,
      };
    }

    for (const budget of totalBudgets) {
      const key = `${type}-${budget[parentIdName]}`;
      if (!results[key]) results[key] = {};

      const sumObject = results[key][budget.date.getTime()];
      if (sumObject) sumObject.budget = budget.total;
      else
        results[key][budget.date.getTime()] = {
          [parentIdName]: budget[parentIdName],
          date: budget.date,
          actual: 0,
          budget: budget.total,
        };
    }

    return results;
  }

  static async getAllTotalSums(type, userId, parentIdName, from, to) {
    return MonthlyTotalService.totalSums(
      type,
      { userId },
      parentIdName,
      from,
      to
    );
  }

  static async getTotalSums(type, categoryId, parentIdName, from, to) {
    return MonthlyTotalService.totalSums(
      type,
      { categoryId },
      parentIdName,
      from,
      to
    );
  }

  static async getAllCategoryTotalSums(userId, from, to) {
    return MonthlyTotalService.getAllTotalSums(
      "category",
      userId,
      "categoryId",
      from,
      to
    );
  }

  static async getAllSubcategoryTotalSums(userId, from, to) {
    return MonthlyTotalService.getAllTotalSums(
      "subcategory",
      userId,
      "subcategoryId",
      from,
      to
    );
  }

  static async getAllDatevTotalSums(userId, from, to) {
    return MonthlyTotalService.getAllTotalSums(
      "datev",
      userId,
      "DatevAccountId",
      from,
      to
    );
  }
}

module.exports = MonthlyTotalService;
