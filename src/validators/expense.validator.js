const { z } = require("zod");

const expenseSchema = z.object({
  amount: z
    .number()
    .positive()
    .refine((val) => Number.isInteger(val * 100), {
      message: "Max 2 decimal places allowed",
    }),

  category: z.string().min(1).max(50),

  description: z.string().max(200).optional(),

  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

module.exports = { expenseSchema };