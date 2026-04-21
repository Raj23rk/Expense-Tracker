const express = require("express");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: "https://frontend-expense-tracker-rho.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/expenses", require("./routes/expense.routes"));

// error middleware (keep at bottom)
app.use(require("./middlewares/error.middleware"));

module.exports = app;