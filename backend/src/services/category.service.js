const { Category, Subcategory, DatevAccount } = require("../models");

class CategoryService {
  static async getCategory(id) {
    const category = await Category.findByPk(id);
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
}

module.exports = CategoryService;
