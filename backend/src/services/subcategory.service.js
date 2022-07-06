const { Subcategory } = require("../models");
const { NotFoundError } = require("../exceptions");

class SubcategoryService {
  static async getSubcategories(userId) {
    const subcategories = await Subcategory.findAll({ where: { userId } });
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
