const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourController');

router.post('/', controller.createTour);
router.get('/', controller.getTours);
router.post('/:id/expenses', controller.addExpense);
router.get('/:id/summary', controller.getSummary);

module.exports = router;
