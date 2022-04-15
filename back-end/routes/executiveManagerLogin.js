const express = require("express");
const joi = require("joi");
const { ExecutiveManager } = require("../models/executiveManager");
const bcrypt = require("bcrypt");
const router = express.Router();

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const executive = await ExecutiveManager.findOne({
    username: req.body.username,
  });
  if (!executive) return res.status(400).send("Invalid username or password");

  const validLogin = await bcrypt.compare(
    req.body.password,
    executive.password
  );
  if (!validLogin) return res.status(400).send("Invalid username or password");

  const token = executive.generateJWTToken();
  res.send({ id: executive._id, token });
});

module.exports = router;
