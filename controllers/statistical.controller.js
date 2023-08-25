const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');
const asyncHandle = require('../middlewares/asyncHandle');
const ErrorResponse = require('../common/ErrorResponse');

module.exports.getSalesByDay = asyncHandle(async (req, res) => {
  const { fromDate, toDate } = req.query;

  if (!fromDate || !toDate) {
    throw new ErrorResponse('Missing required parameters', 400);
  }

  const sales = await OrderProduct.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: '$createdAt' }, month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        totalQuantity: { $sum: '$quantity' },
      },
    },
  ]);

  const productIds = sales.map(sale => sale._id);
  const products = await Product.find({ _id: { $in: productIds } });

  return res.render('statistical/index', {
    sales,
    products,
    fromDate,
    toDate
  });
});
