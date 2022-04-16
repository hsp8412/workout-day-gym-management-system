const express = require('express');
const router = express.Router();
const {Appointment} = require('../models/appointment');
const customerAuth = require('../middleware/customerAuth');
const managerAuth = require('../middleware/managerAuth');
const customerOrManagerAuth = require('../middleware/customerOrManagerAuth');

// Get all occupied slots for a coach
router.get('/:date/:id', customerAuth, async (req, res) => {
    const result = await Appointment.find({coachId: req.params.id, date: req.params.date});
    res.send(result.map(a => a.slot));
});

// Get all occupied slots for a customer
router.get('/:id', customerAuth, async (req, res) => {
    const result = await Appointment.find({customerId: req.params.id});
    res.send(result);
});

// Get all appointments
router.get('/', managerAuth, async (req, res) => {
    const result = await Appointment.find();
    res.send(result);
});

// Create a new appointment
router.post('/', customerAuth, async (req, res) => {
    const {coachId, date, slot, customerId} = req.body;
    const appointment = new Appointment({coachId, date, slot, customerId});
    try {
        await appointment.save();
        res.send(appointment);
    } catch (e) {
        res.status(500).send("Internal Error")
    }
});

// Modify an appointment
router.put('/:id', managerAuth, async (req, res) => {
    const {coachId, date, slot, customerId} = req.body;
    try {
        const result = await Appointment.findByIdAndUpdate(req.params.id, {coachId, date, slot, customerId});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

// Delete an appointment
router.delete('/:id', customerOrManagerAuth, async (req, res) => {
    const result = await Appointment.findByIdAndDelete(req.params.id);
    res.send(result);
});

module.exports = router;