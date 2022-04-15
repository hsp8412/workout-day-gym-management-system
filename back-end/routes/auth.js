const express = require('express');
const joi = require('joi');
const { Customer } = require('../models/customer');
const bcrypt = require('bcrypt')
const router = express.Router();

const schema = joi.object({
    email: joi.string().email().max(255).required(),
    password: joi.string().required()
});

router.post('/', async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(400).send("Invalid email or password");

    const validLogin = await bcrypt.compare(req.body.password, customer.password);
    if (!validLogin) res.status(400).send('Invalid email or password');

    const token = customer.generateJWTToken();
    res.send({id: customer._id, token})
});

module.exports = router;