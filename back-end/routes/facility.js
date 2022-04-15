const express = require('express');
const router = express.Router();
const { Facility, validateFacility } = require('../models/facility');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await Facility.find();
    res.send(result);
});

router.get('/common', async (req, res) => {
    const result = await Facility.find({isEquipment: true});
    res.send(result);
});

router.get('/locker', async (req, res) => {
    const result = await Facility.find({isEquipment: false});
    res.send(result);
});

router.post('/common', auth, async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { isEquipment, price, condition, type } = req.body;
    const facility = new Facility({ isEquipment, isTemporaryLocker: false, price, condition, type });
    try {
        const result = await facility.save();
        res.send(result);
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

router.post('/locker', auth, async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    const { isEquipment, isTemporaryLocker, price, condition, type, locker_number, rental } = req.body;
    const facility = new Facility({isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: isTemporaryLocker ? {renterId: null, startDate: null, endDate: null} : rental});
    try {
        const result = await facility.save();
        res.send(result);
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

router.put('/common/:id', auth, async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    const { isEquipment, price, condition, type } = req.body;
    const facility = { isEquipment, isTemporaryLocker: false, price, condition, type };
    try{
        const result = await Facility.findByIdAndUpdate(req.params.id, facility, { new: true});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.put('/locker/:id', auth, async (req, res) => {
    const { error } = validateFacility(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    const { isEquipment, isTemporaryLocker, price, condition, type, locker_number, rental } = req.body;
    const facility = { isEquipment, isTemporaryLocker, price, condition, type, locker_number,
        rental: isTemporaryLocker ? {renterId: null, startDate: null, endDate: null} : rental};
    try{
        const result = await Facility.findByIdAndUpdate(req.params.id, facility, { new: true});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.delete('/common/:id', auth, async (req, res) => {
    try {
        const result = await Facility.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.delete('/locker/:id', auth, async (req, res) => {
    try {
        const result = await Facility.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;