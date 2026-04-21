const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

expenseSchema.index({ category: 1, date: -1 });

module.exports = mongoose.model("Expense", expenseSchema);