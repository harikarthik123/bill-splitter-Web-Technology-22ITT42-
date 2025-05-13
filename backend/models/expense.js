const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  paidBy: String,
  sharedBy: [String],
});

module.exports = mongoose.model('Expense', expenseSchema);
