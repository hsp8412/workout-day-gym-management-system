const joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const executiveManagerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

executiveManagerSchema.methods.generateJWTToken = () =>
  jwt.sign({ id: this._id }, process.env.JWT_KEY);

const ExecutiveManager = mongoose.model(
  "ExecutiveManager",
  executiveManagerSchema,
  "executiveManager"
);

function validateExecutive(executive) {
  const schema = joi
    .object({
      username: joi.string().required(),
      password: joi.string().required(),
    })
    .unknown(true);
  return schema.validate(executive);
}

module.exports.ExecutiveManager = ExecutiveManager;
module.exports.validateExecutiveManager = validateExecutive;
