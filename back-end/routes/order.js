const express = require("express");
const router = express.Router();
const { Order, validateOrder } = require("../models/order");
const customerAuth = require("../middleware/customerAuth");
const managerAuth = require("../middleware/managerAuth");
const customerOrManagerAuth = require("../middleware/customerOrManagerAuth");

router.get('/customer/:id', customerAuth, async (req, res) => {
  try {
    const result = await Order.find({customerId: req.params.id});
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.get("/:id", customerOrManagerAuth, async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.get("/", managerAuth, async (req, res) => {
  const result = await Order.find();
  res.send(result);
});

router.post("/", customerOrManagerAuth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { products, customerId } = req.body;
  const createDate = Date.now();
  const isFulfilled = false;
  const order = new Order({
    products,
    customerId,
    createDate,
    isFulfilled,
  });
  try {
    const result = await order.save();
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Error");
  }
});

router.delete("/:id", customerOrManagerAuth, async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.patch('/:id', managerAuth, async (req, res) => {
  const { isFulfilled } = req.body;
  try {
    const result = await Order.findByIdAndUpdate(req.params.id, {$set: { isFulfilled }});
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
