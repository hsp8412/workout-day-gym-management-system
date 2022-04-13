const express = require('express');
const router = express.Router();
const { BranchStaff, validateBranchStaff } = require('../models/branchStaff');
const joi = require("joi");

router.get('/', async (req, res) => {
    const branchStaff = await BranchStaff.find();
    res.send(branchStaff);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validateBranchStaff(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {firstName, middleName, lastName, phone, address, email, ssn, salary} = req.body;
    const branchStaff = new BranchStaff({
        firstName, middleName, lastName, phone, address, email, ssn, salary
    });
    const result = await branchStaff.save();
    res.send(result);}
);


module.exports = router;