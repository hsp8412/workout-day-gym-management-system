const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Customer, validateCustomer } = require("../models/customer");
const managerAuth = require("../middleware/managerAuth");
const customerAuth = require("../middleware/customerAuth");
const customerOrManagerAuth = require('../middleware/customerOrManagerAuth');

router.get("/", managerAuth, async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

router.get("/:id", customerOrManagerAuth, async (req, res) => {
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
  let {
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password,
    email,
    emergencyContact,
  } = req.body;

  if (!emergencyContact) {
    emergencyContact = {
      name: "",
      phoneNumber: "",
    };
  }

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

router.put("/:id", managerAuth, async (req, res) => {
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

  const customer = {
    gender,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password,
    emergencyContact,
    fitnessProfile,
    email,
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

router.patch("/profile/:id", customerAuth, async (req, res) => {
  const { height, weight, BFP, BMI } = req.body;
  const lastUpdateDate = Date.now();
  try {
    const result = await Customer.findByIdAndUpdate(req.params.id, {
      $set: { fitnessProfile: { height, weight, BFP, BMI, lastUpdateDate } },
    });
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad request");
  }
});

router.patch("/password/:id", customerAuth, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).send("Bad Request");
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const result = await Customer.findByIdAndUpdate(req.params.id, {
      $set: { password: passwordHash },
    });
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad request");
  }
});

router.delete("/:id", managerAuth, async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
