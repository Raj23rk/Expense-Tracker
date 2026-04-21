const express = require("express");
const router = express.Router();
const controller = require("../controllers/expense.controller");

router.post("/", controller.createExpense);
router.get("/", controller.getExpenses);

module.exports = router;