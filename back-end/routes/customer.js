const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber },
        fitnessProfile: { height, weight, BFP, BMI } } = req.body;

    const customerrr = new cust({
        gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber }, fitnessProfile: { height, weight, BFP, BMI }
    });
    //const customerrr = new cust({request});
    const result = await customerrr.save();
    res.send(result);
});


module.exports = router;