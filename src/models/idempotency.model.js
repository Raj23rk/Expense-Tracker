const mongoose = require("mongoose");

const idempotencySchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    response: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idempotency", idempotencySchema);