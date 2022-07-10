const MonthlyTotalService = require("./monthlyTotal.service");
const { Subcategory } = require("../models");

const { NotFoundError } = require("../exceptions");

class SubcategoryService {
  static async getSubcategories(userId, from, to) {
    const res = await Subcategory.findAll({
      where: { userId },
      raw: true,
    });

    const subcategories = [];
    const totalSums = await MonthlyTotalService.getAllSubcategoryTotalSums(
      userId,
      from,
      to
    );

    for (const subcategory of res) {
      const sumsObject = totalSums[`subcategory-${subcategory.id}`];
      if (sumsObject) {
        const sums = Object.values(sumsObject);
        subcategories.push({ ...subcategory, totalSums: sums });
      }
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
