const { SubcategoryService } = require("../services");

class SubcategoryController {
  static async getSubcategories(req, res) {
    const subcategories = await SubcategoryService.getSubcategories(
      req.user.id
    );
    return res.json(subcategories);
  }

  static async updateSubcategory(req, res) {
    const { data } = req.body;
    const { subcategoryId } = req.params;

    const updatedSubcategory = SubcategoryService.updatedSubcategory(
      req.user.id,
      subcategoryId,
      data
    );
    return res.json(updatedSubcategory);
  }
}

module.exports = SubcategoryController;
