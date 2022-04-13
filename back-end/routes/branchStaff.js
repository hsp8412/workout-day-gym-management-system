const express = require('express');
const router = express.Router();
const { BranchStaff, validateBranchStaff } = require('../models/branchStaff');

router.get('/', async (req, res) => {
    const result = await BranchStaff.find();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    try {
        const result = await BranchStaff.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

router.post('/', async (req, res) => {
    const { error } = validateBranchStaff(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { firstName, middleName, lastName, phone, address, email, ssn, salary } = req.body;
    const branchStaff = new BranchStaff({
        firstName, middleName, lastName, phone, address, email, ssn, salary
    });
    try {
        const result = await branchStaff.save();
    } catch (e) {
        res.status(500).send("Internal Error");
    }
    res.send(result);}
);

router.put('/:id', async (req, res) => {
    const { error } = validateBranchStaff(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { firstName, middleName, lastName, phone, address, email, ssn, salary } = req.body;
    try {
        const result = await BranchStaff.findByIdAndUpdate(req.params.id, {
            firstName, middleName, lastName, phone, address, email, ssn, salary
        }, { new: true });
        res.send(result);
    } catch (e) {
        return res.status(400).send("Bad Request");
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await BranchStaff.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

module.exports = router;