const express = require('express');
const router = express.Router();
const { Facility, validateFacility } = require('../models/faciliy');

router.get('/', async (req, res) => {
    const result = await Facility.find();
    res.send(result);
});

router.get('/id', async (req, res) => {
   try {
       const result = await Facility.findById(req.params.id);
       res.send(result);
   } catch (e) {
       res.status(400).send("Bad Request");
   }
});

router.post('/', async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate } } = req.body;
    const facility = new Facility({
        isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate }
    });
    try{
        const result = await facility.save();
        res.send(result);
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate } } = req.body;
    const facility = {
        isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: { renterId, startDate, endDate }
    };
    try{
        const result = await Facility.findByIdAndUpdate(req.params.id, facility, { new: true});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await Facility.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;