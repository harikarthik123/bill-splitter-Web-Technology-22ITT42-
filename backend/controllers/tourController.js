const Tour = require('../models/tour');
const Expense = require('../models/expense');

exports.createTour = async (req, res) => {
  const { name, participants } = req.body;
  try {
    const tour = new Tour({ name, participants });
    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExpense = async (req, res) => {
  const { description, amount, paidBy, sharedBy } = req.body;
  try {
    const expense = new Expense({ description, amount, paidBy, sharedBy });
    await expense.save();

    const tour = await Tour.findById(req.params.id);
    tour.expenses.push(expense._id);
    await tour.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('expenses');
    const balances = {};

    tour.participants.forEach(p => balances[p] = 0);

    tour.expenses.forEach(exp => {
      const share = exp.amount / exp.sharedBy.length;
      exp.sharedBy.forEach(p => balances[p] -= share);
      balances[exp.paidBy] += exp.amount;
    });

    res.json(balances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
