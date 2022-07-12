import ApiInterface from "./interface";

class BudgetApi extends ApiInterface {
  constructor() {
    super("budgets");
  }
}

export default BudgetApi;
