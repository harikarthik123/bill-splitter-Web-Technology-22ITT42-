const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  participants: [String],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }]
});

module.exports = mongoose.model('Tour', tourSchema);
