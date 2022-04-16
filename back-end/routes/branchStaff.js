const express = require('express');
const router = express.Router();
const { BranchStaff, validateBranchStaff } = require('../models/branchStaff');
const managerAuth = require('../middleware/managerAuth');
const customerAuth = require('../middleware/customerAuth')

router.get('/coach', customerAuth, async (req, res) => {
    try {
        const result = await BranchStaff.find({isCoach: true});
        res.send(result.map(c => {
            return {coachId: c._id, firstName: c.firstName, lastName: c.lastName}
        }));
    } catch (e) {
        res.status(500).send("Internal Error");
    }
});

router.get('/:id', managerAuth, async (req, res) => {
    try {
        const result = await BranchStaff.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

router.get('/', managerAuth, async (req, res) => {
    const result = await BranchStaff.find();
    res.send(result);
});

router.post('/', managerAuth, async (req, res) => {
    const { error } = validateBranchStaff(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { firstName, middleName, lastName, phone, address, email, ssn, salary, isCoach } = req.body;
    const branchStaff = new BranchStaff({
        firstName, middleName, lastName, phone, address, email, ssn, salary, isCoach
    });
    try {
        const result = await branchStaff.save();
        res.send(result);
    } catch (e) {
        res.status(500).send("Internal Error");
    }}
);

router.put('/:id', managerAuth, async (req, res) => {
    const { error } = validateBranchStaff(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { firstName, middleName, lastName, phone, address, email, ssn, salary, isCoach } = req.body;
    try {
        const result = await BranchStaff.findByIdAndUpdate(req.params.id, {
            firstName, middleName, lastName, phone, address, email, ssn, salary, isCoach
        }, { new: true });
        res.send(result);
    } catch (e) {
        return res.status(400).send("Bad Request");
    }
})

router.delete('/:id', managerAuth, async (req, res) => {
    try {
        const result = await BranchStaff.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request")
    }
});

module.exports = router;