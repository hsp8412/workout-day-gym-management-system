const express = require('express');
const router = express.Router();
const { facilities, validatefacility } = require('../models/faciliy');
const joi = require("joi");

router.get('/', async (req, res) => {
    const faci = await facilities.find();
    res.send(faci);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validatefacility(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate } } = req.body;
    const faci = new facilities({
        isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate }
    });
    const result = await faci.save();
    res.send(result);
}
);


module.exports = router;