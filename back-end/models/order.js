const joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createDate: { type: Date },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  isFulfilled: { type: Boolean },
});

const Order = mongoose.model("Order", orderSchema, "order");

function validateOrder(order) {
  const schema = joi.object({
    products: joi.array().items({
      name: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number().max(100).min(1).required(),
    }),
    createDate: joi.date(),
    branchId: joi.string(),
    customerId: joi.string().required(),
    isFulfilled: joi.string(),
  });
  return schema.validate(order);
}

module.exports.Order = Order;
module.exports.validateOrder = validateOrder;
