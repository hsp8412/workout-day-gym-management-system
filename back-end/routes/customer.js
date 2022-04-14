const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
    const result = await Customer.find();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Customer.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber },
        fitnessProfile: { height, weight, BFP, BMI },email } = req.body;

    const customer = new Customer({
        gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber }, fitnessProfile: { height, weight, BFP, BMI },
        email
    });

    try {
        const result = await customer.save();
        res.send(result);
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber },
        fitnessProfile: { height, weight, BFP, BMI },email } = req.body;

    const customer = {
        gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber }, fitnessProfile: { height, weight, BFP, BMI },
        email
    };

    try {
        const result = await Customer.findByIdAndUpdate(req.params.id, customer, { new: true });
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
