const sequelize = require("sequelize");
const {
  Category,
  Subcategory,
  DatevAccount,
  Transfer,
  Budget,
} = require("../models");
const { NotFoundError, AuthorizationError } = require("../exceptions");

class CategoryService {
  static async totalSums({ userId, categoryId }) {
    const opts = {
      attributes: [
        "date",
        "categoryId",
        [sequelize.fn("sum", sequelize.col("amount")), "total"], // sum all values in column "amount" and return it as "total"
      ],
      group: ["date", "categoryId"],
      order: [["date", "ASC"]],
      raw: true,
    };

    if (userId) opts.where = { userId };
    else if (categoryId) opts.where = { categoryId };

    const totalTransfers = await Transfer.findAll(opts);
    const totalBudgets = await Budget.findAll(opts);

    const results = {};

    // we need two loops to also add budgets when there are no transfers and vice versa
    for (const transfer of totalTransfers) {
      const key = `cat-${transfer.categoryId}`;
      if (!results[key]) results[key] = {};

      results[key][transfer.date.getTime()] = {
        categoryId: transfer.categoryId,
        date: transfer.date,
        actual: transfer.total,
        budget: 0,
      };
    }

    for (const budget of totalBudgets) {
      const key = `cat-${budget.categoryId}`;
      if (!results[key]) results[key] = {};

      const sumObject = results[key][budget.date.getTime()];
      if (sumObject) sumObject.budget = budget.total;
      else
        results[key][budget.date.getTime()] = {
          categoryId: budget.categoryId,
          date: budget.date,
          actual: 0,
          budget: budget.total,
        };
    }

    return results;
  }

  static async getAllTotalSums(userId) {
    return CategoryService.totalSums({ userId });
  }

  static async getTotalSums(categoryId) {
    return CategoryService.totalSums({ categoryId });
  }

  static async findCategories(where, options = {}) {
    const categories = await Category.findAll({ where, ...options });
    return categories;
  }

  static async getCategories(userId) {
    const categories = await CategoryService.findCategories(
      { userId },
      { raw: true }
    );

    const totalSums = await CategoryService.getAllTotalSums(userId);
    for (const category of categories) {
      const sumsObject = totalSums[`cat-${category.id}`];
      if (sumsObject) {
        const sums = Object.values(sumsObject);
        category.totalSums = sums;
      }
    }

    return categories;
  }

  static async getCategory(id, userId) {
    const category = await Category.findOne({ where: { id, userId } });
    return category;
  }

  static async getSubcategories(categoryId) {
    const categories = await Subcategory.findAll({ where: { categoryId } });
    return categories;
  }

  static async getDatevAccounts(categoryId) {
    const subcategoryIds = await Subcategory.findAll({
      where: { categoryId },
      attributes: ["id"],
      raw: true,
    });

    const datevAccounts = await DatevAccount.findAll({
      where: { subcategoryId: subcategoryIds },
    });

    return datevAccounts;
  }

  static async updateCategory(categoryId, userId, data) {
    const category = await Category.findOne({
      where: { id: categoryId, userId },
    });
    if (!category) throw new NotFoundError();

    return category.update(data);
  }

  static async updateSubcategory(subcategoryId, userId, data) {
    const subcategory = await Subcategory.findOne({
      where: { id: subcategoryId, userId },
    });

    if (!subcategory) throw new NotFoundError();

    if (data.categoryId) {
      const category = await CategoryService.getCategory(
        data.categoryId,
        userId
      );
      if (!category) throw new AuthorizationError();
    }

    return subcategory.update(data);
  }

  static async updateDatevAccount(accountId, userId, data) {
    const account = await DatevAccount.findOne({
      where: { id: accountId, userId },
    });

    if (!account) throw new NotFoundError();

    if (data.subcategoryId) {
      const subcategory = await Subcategory.findOne({
        where: { id: data.subcategoryId, userId },
      });
      if (!subcategory) throw new AuthorizationError();
    }

    // eslint-disable-next-line no-param-reassign
    if (data.number) delete data.number;

    return account.update(data);
  }
}

module.exports = CategoryService;
