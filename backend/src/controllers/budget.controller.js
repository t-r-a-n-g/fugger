const { BudgetService } = require("../services");

class BudgetController {
  static async getBudgets(req, res) {
    const { from, to } = req.query;

    const budgets = await BudgetService.getBudgets(from, to, req.user.id);
    return res.json(budgets);
  }

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

  static async createBudget(req, res) {
    const budgets = req.body;
    const budgetsNew = await BudgetService.createBudgets(budgets, req.user.id);
    return res.json(budgetsNew);
  }
}

module.exports = BudgetController;
