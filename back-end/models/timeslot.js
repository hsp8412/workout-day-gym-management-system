const joi = require("joi");
const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
  startTime: { type: Date },
  endTime: { type: Date },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "BranchStaff" },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  isBooked: { type: Boolean },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

const Timeslot = mongoose.model("TimeSlot", timeslotSchema, "timeSlot");

function validateTimeslot(timeslot) {
  const schema = joi.object({
    startTime: joi.date().required(),
    endTime: joi.date().required(),
    coachId: joi.string().required(),
    branchId: joi.string().required(),
    isBooked: joi.boolean(),
    customerId: joi.string(),
  });
  return schema.validate(timeslot);
}

module.exports.Timeslot = Timeslot;
module.exports.validateTimeslot = validateTimeslot;
