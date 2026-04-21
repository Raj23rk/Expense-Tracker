const { expenseSchema } = require("../validators/expense.validator");
const service = require("../services/expense.service");

const createExpense = async (req, res, next) => {
  try {
    const parsed = expenseSchema.parse(req.body);

    const result = await service.createExpense(
      parsed,
      req.headers["idempotency-key"]
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const result = await service.getExpenses(req.query);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getExpenses };