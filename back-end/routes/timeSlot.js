const express = require("express");
const router = express.Router();
const { Timeslot, validateTimeslot } = require("../models/timeslot");
const joi = require("joi");

router.get("/", async (req, res) => {
  const result = await Timeslot.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Timeslot.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateTimeslot(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { startTime, endTime, coachId, branchId } = req.body;
  const isBooked = false;
  const customerId = null;
  const timeslot = new Timeslot({
    startTime,
    endTime,
    coachId,
    branchId,
    isBooked,
    customerId,
  });
  try {
    const result = await timeslot.save();
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateTimeslot(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { startTime, endTime, coachId, branchId, isBooked, customerId } =
    req.body;
  const timeslot = {
    startTime,
    endTime,
    coachId,
    branchId,
    isBooked,
    customerId,
  };
  try {
    const result = await Timeslot.findByIdAndUpdate(req.params.id, timeslot, {
      new: true,
    });
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Timeslot.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
