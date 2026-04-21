const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS MUST be first (before routes)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-tracker-1-av8f.onrender.com"
    ],
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