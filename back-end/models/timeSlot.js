const joi = require("joi");
const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: { type: Date },
  endTime: { type: Date },
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema, "timeSlot");

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
