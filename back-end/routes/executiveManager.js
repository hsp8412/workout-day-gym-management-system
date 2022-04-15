const express = require("express");
const router = express.Router();
const {
  validateExecutiveManager,
  ExecutiveManager,
} = require("../models/executiveManager");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateExecutiveManager(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const { username, password } = req.body;

  const ExecutiveInDB = await ExecutiveManager.findOne({
    username: req.body.username,
  });
  if (ExecutiveInDB) return res.status(400).send("Username already exists");

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const executiveManager = new ExecutiveManager({
    username,
    password: passwordHash,
  });

  try {
    const result = await executiveManager.save();
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
