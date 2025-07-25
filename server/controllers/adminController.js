const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Helper: get today's date range
function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSalesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    // Low stock products (stock < 5)
    const lowStock = await Product.find({ stock: { $lt: 5 } });

    // Best selling products (by quantity sold)
    const bestSellersAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", totalSold: { $sum: "$items.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      { $project: { _id: 0, product: 1, totalSold: 1 } }
    ]);

    // Sales trends (last 14 days)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 13);
    const salesTrends = await Order.aggregate([
      { $match: { createdAt: { $gte: twoWeeksAgo } } },
      { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        total: { $sum: "$total" },
        count: { $sum: 1 }
      } },
      { $sort: { _id: 1 } }
    ]);

    // Daily summary (today)
    const { start, end } = getTodayRange();
    const todayOrders = await Order.find({ createdAt: { $gte: start, $lte: end } });
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const todayCount = todayOrders.length;

    // Profit/loss (requires costPrice on products)
    // For each order, sum (selling price - cost price) * quantity
    let totalCost = 0;
    let totalProfit = 0;
    const allOrders = await Order.find().populate('items.product');
    allOrders.forEach(order => {
      order.items.forEach(item => {
        const selling = item.product?.price || 0;
        const cost = item.product?.costPrice || 0;
        totalCost += cost * item.quantity;
        totalProfit += (selling - cost) * item.quantity;
      });
    });
    let todayProfit = 0;
    todayOrders.forEach(order => {
      order.items.forEach(item => {
        const selling = item.product?.price || 0;
        const cost = item.product?.costPrice || 0;
        todayProfit += (selling - cost) * item.quantity;
      });
    });

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalSales,
      totalCost,
      totalProfit,
      lowStock,
      bestSellers: bestSellersAgg,
      salesTrends,
      today: {
        sales: todaySales,
        orders: todayCount,
        profit: todayProfit,
      },
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 