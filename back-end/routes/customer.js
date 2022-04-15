const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Customer, validateCustomer } = require("../models/customer");
const joi = require("joi");

router.get("/", async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Customer.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const {
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password,
    email,
    emergencyContact,
  } = req.body;

  const customerInDB = await Customer.findOne({ email: req.body.email });
  if (customerInDB) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const customer = new Customer({
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password: passwordHash,
    email,
    emergencyContact,
    fitnessProfile: {
      height: 0,
      weight: 0,
      BFP: 0,
      BMI: 0,
      lastUpdateDate: Date.now(),
    },
  });

  try {
    const result = await customer.save();
    const { _id } = result;
    const token = customer.generateJWTToken();
    res.header("x-token", token).send({ _id });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password,
    emergencyContact,
    fitnessProfile,
    email,
    lastUpdateDate,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const customer = {
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password: passwordHash,
    emergencyContact,
    fitnessProfile,
    email,
    lastUpdateDate,
  };

  try {
    const result = await Customer.findByIdAndUpdate(req.params.id, customer, {
      new: true,
    });
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
