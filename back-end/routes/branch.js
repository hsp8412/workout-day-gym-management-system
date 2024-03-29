const express = require("express");
const router = express.Router();
const { Branch, validateBranch } = require("../models/branch");
const executiveAuth = require("../middleware/executiveAuth");

router.get("/", executiveAuth, async (req, res) => {
  const result = await Branch.find();
  res.send(result);
});

router.get("/:id", executiveAuth, async (req, res) => {
  try {
    const result = await Branch.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.post("/", executiveAuth, async (req, res) => {
  const { error } = validateBranch(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { location, numberOfMembers, yearlyProfit, managerId, name } = req.body;
  const branch = new Branch({
    name,
    location,
    numberOfMembers,
    yearlyProfit,
    managerId,
  });
  try {
    const result = await branch.save();
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Error");
  }
});

router.put("/:id", executiveAuth, async (req, res) => {
  const { error } = validateBranch(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { location, numberOfMembers, yearlyProfit, managerId, name } = req.body;
  try {
    const result = await Branch.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        numberOfMembers,
        yearlyProfit,
        managerId,
      },
      { new: true }
    );
    res.send(result);
  } catch (e) {
    return res.status(400).send("Bad Request");
  }
});

router.patch("/:id", executiveAuth, async (req, res) => {
  const { name, location, yearlyProfit, numberOfMembers } = req.body;
  try {
    const result = await Branch.findByIdAndUpdate(req.params.id, {
      $set: { name, location, yearlyProfit, numberOfMembers },
    });
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad request");
  }
});

router.delete("/:id", executiveAuth, async (req, res) => {
  try {
    const result = await Branch.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
