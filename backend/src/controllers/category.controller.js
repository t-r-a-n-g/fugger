const { CategoryService } = require("../services");

class CategoryController {
  static async getAllTotalSums(req, res) {
    const totalSums = await CategoryService.getAllTotalSums(req.user.id);

    return res.json(totalSums);
  }

  static async getTotalSums(req, res) {
    const { categoryId } = req.params;
    const totalSums = await CategoryService.getTotalSums(categoryId);

    return res.json(totalSums);
  }

  static async getCategories(req, res) {
    const categories = await CategoryService.getCategories(req.user.id);
    return res.json(categories);
  }

  static async updateCategory(req, res) {
    const data = { ...req.body };
    const { categoryId } = req.params;

    const category = await CategoryService.updateCategory(
      categoryId,
      req.user.id,
      data
    );

    return res.json(category);
  }

  static async updateSubcategory(req, res) {
    const data = { ...req.body };
    const { categoryId } = req.params;

    const category = await CategoryService.updateSubcategory(
      categoryId,
      req.user.id,
      data
    );

    return res.json(category);
  }

  static async updateDatevAccount(req, res) {
    const data = { ...req.body };
    const { accountId } = req.params;

    const account = await CategoryService.updateDatevAccount(
      accountId,
      req.user.id,
      data
    );

    return res.json(account);
  }
}

module.exports = CategoryController;
