const express = require('express');
const router = express.Router();
const { cust, validateCust } = require('../models/cust');
const joi = require("joi");

router.get('/', async (req, res) => {
    const customer = await cust.find();
    res.send(customer);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validateCust(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { gender, firstName, middleName, lastName, phoneNumber,
        password,
        emergencyContact: { contact_name, contactPhoneNumber },
        fitnessProfile: { height, weight, BFP, BMI } } = req.body;
    // const request = req.body; 

    const customerrr = new cust({
        gender, firstName, middleName, lastName, phoneNumber, password,
        emergencyContact: { contact_name, contactPhoneNumber }, fitnessProfile: { height, weight, BFP, BMI }
    });
    //const customerrr = new cust({request});
    const result = await customerrr.save();
    res.send(result);
}
);


module.exports = router;