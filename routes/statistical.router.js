const express = require('express');
const statisticalController = require('../controllers/statistical.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const statisticalRouter = express.Router();

statisticalRouter
  .route('/sales')
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    statisticalController.getSalesByDay
  );

module.exports = statisticalRouter;
