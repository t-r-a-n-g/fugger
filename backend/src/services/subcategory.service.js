const sequelize = require("sequelize");

const { Subcategory, Transfer, Budget } = require("../models");

const { NotFoundError } = require("../exceptions");

class SubcategoryService {
  static async totalSums({ userId, subcategoryId }) {
    const opts = {
      attributes: [
        "date",
        "subcategoryId",
        [sequelize.fn("sum", sequelize.col("amount")), "total"],
      ],
      group: ["date", "subcategoryId"],
      order: [["date", "ASC"]],
      raw: true,
    };

    if (userId) opts.where = { userId };
    else if (subcategoryId) opts.where = { subcategoryId };

    const totalTransfers = await Transfer.findAll(opts);
    const totalBudgets = await Budget.findAll(opts);
    const results = [];

    for (const transfer of totalTransfers) {
      const budget = totalBudgets.find(
        (tb) =>
          tb.date.getTime() === transfer.date.getTime() &&
          transfer.subcategoryId === tb.subcategoryId
      );

      results.push({
        subcategoryId: transfer.subcategoryId,
        date: transfer.date,
        actual: transfer.total,
        budget: budget?.total || 0,
      });
    }

    return results;
  }

  static async getAllTotalSums(userId) {
    return SubcategoryService.totalSums({ userId });
  }

  static async getTotalSums(categoryId) {
    return SubcategoryService.totalSums({ categoryId });
  }

  static async getSubcategories(userId) {
    const subcategories = await Subcategory.findAll({
      where: { userId },
      raw: true,
    });
    const totalSums = await SubcategoryService.getAllTotalSums(userId);

    for (const subcategory of subcategories) {
      subcategory.totalSums = totalSums.filter(
        (sum) => sum.subcategoryId === subcategory.id
      );
    }

    return subcategories;
  }

  static async updateSubcategory(userId, subcategoryId, data) {
    const subcategory = await Subcategory.findOne({
      where: userId,
      id: subcategoryId,
    });
    if (!subcategory) throw new NotFoundError();

    subcategory.update(data);
    return subcategory;
  }
}

module.exports = SubcategoryService;
