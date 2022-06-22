const { BudgetService } = require("../services");

class BudgetController {
  static async updateBudget(req, res) {
    const { budgetId } = req.params;
    const { amount } = req.body;

    const budget = await BudgetService.updateBudget(
      budgetId,
      req.user.id,
      amount
    );
    return res.json(budget);
  }
}

module.exports = BudgetController;
