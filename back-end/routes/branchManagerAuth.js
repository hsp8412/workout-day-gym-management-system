const express = require('express');
const bcrypt = require('bcrypt')
const {BranchManager, validateBranchManager} = require("../models/branchManager");
const executiveAuth = require("../middleware/executiveAuth");
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateBranchManager(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const manager = await BranchManager.findOne({username: req.body.username});
    if (!manager) return res.status(400).send("Invalid username or password");

    const validLogin = await bcrypt.compare(req.body.password, manager.password);
    if (!validLogin) {
        return res.status(400).send('Invalid username or password');
    }

    const token = manager.generateJWTToken();
    res.send({token})
});


// Used to generate manager
router.post('/generate', executiveAuth, async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const manager = new BranchManager({username, password: passwordHash});
    await manager.save();
    res.send(manager);
})

module.exports = router;