const express = require('express');
const router = express.Router();
const { Branch, validateBranch } = require('../models/branch');

router.get('/', async (req, res) => {
    const result = await Branch.find();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Branch.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

router.post('/', async (req, res) => {
    const { error } = validateBranch(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { location, numberOfMembers, yearlyProfit, managerId } = req.body;
    const branchStaff = new Branch({
        location, numberOfMembers, yearlyProfit, managerId
    });
    try {
        const result = await branchStaff.save();
    } catch (e) {
        res.status(500).send("Internal Error");
    }
    res.send(result);}
);

router.put('/:id', async (req, res) => {
    const { error } = validateBranch(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { location, numberOfMembers, yearlyProfit, managerId } = req.body;
    try {
        const result = await Branch.findByIdAndUpdate(req.params.id, {
            location, numberOfMembers, yearlyProfit, managerId
        }, { new: true });
        res.send(result);
    } catch (e) {
        return res.status(400).send("Bad Request");
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Branch.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

module.exports = router;