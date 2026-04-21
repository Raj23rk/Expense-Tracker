const Expense = require("../models/expense.model");
const Idempotency = require("../models/idempotency.model");

// helper
const toRupees = (paise) => paise / 100;

const createExpense = async (data, idempotencyKey) => {
  try {
    if (idempotencyKey) {
      const existing = await Idempotency.findOne({ key: idempotencyKey });
      if (existing) return existing.response;
    }

    // store in paise
    const amount = Math.round(Number(data.amount) * 100);

    const expense = await Expense.create({
      amount,
      category: data.category.trim(),
      description: data.description?.trim() || "",
      date: new Date(data.date),
    });

    // return in rupees (IMPORTANT FIX)
    const response = {
      id: expense._id.toString(),
      amount: toRupees(expense.amount), // 
      category: expense.category,
      description: expense.description,
      date: expense.date,
      created_at: expense.created_at,
    };

    if (idempotencyKey) {
      await Idempotency.create({
        key: idempotencyKey,
        response,
      });
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpenses = async ({ category, sort }) => {
  try {
    const filter = {};
    if (category) filter.category = category;

    const sortOption = sort === "date_desc" ? { date: -1 } : {};

    const expenses = await Expense.find(filter)
      .sort(sortOption)
      .lean();

    const totalPaise = expenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      expenses: expenses.map((e) => ({
        id: e._id.toString(),
        amount: toRupees(e.amount), 
        category: e.category,
        description: e.description,
        date: e.date,
        created_at: e.created_at,
      })),
      total: toRupees(totalPaise), 
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createExpense, getExpenses };