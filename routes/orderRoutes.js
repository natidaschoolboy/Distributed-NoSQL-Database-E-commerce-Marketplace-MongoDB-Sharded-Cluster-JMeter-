const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('buyer').populate('items.product');
  res.json(orders);
});

// GET single order
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('buyer').populate('items.product');
  res.json(order);
});

// CREATE order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// UPDATE order
router.put('/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE order
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

module.exports = router;
