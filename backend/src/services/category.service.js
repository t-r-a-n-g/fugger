const { Category, Subcategory, DatevAccount } = require("../models");
const { NotFoundError, AuthorizationError } = require("../exceptions");

class CategoryService {
  static async findCategories(where, options = {}) {
    const categories = await Category.findAll(where, options);
    return categories;
  }

  static async getCategories(userId) {
    const categories = await CategoryService.findCategories({ userId });
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
