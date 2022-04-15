const express = require('express');
const router = express.Router();
const { Product, validateProduct} = require('../models/product');
const managerAuth = require('../middleware/managerAuth');

router.get('/', async (req, res) => {
    const prod = await Product.find();
    res.send(prod);
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.post('/', managerAuth, async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    let { InStock, price, name, isCourse, isMeal, isGoods, startTime, endTime,
        courseCoachId, allergies, calories } = req.body;
    if (!isMeal) {
        calories = null;
        allergies = null;
    }
    if (!isCourse) {
        startTime = null;
        endTime = null;
        courseCoachId = null;
    }
    const prod = new Product({
        InStock, price, name, isCourse, isMeal, isGoods, startTime, endTime,
        courseCoachId, allergies, calories
    });
    const result = await prod.save();
    res.send(result);
});

router.put('/:id', managerAuth, async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    let { InStock, price, name, isCourse, isMeal, isGoods, startTime, endTime,
        courseCoachId, allergies, calories } = req.body;
    if (!isMeal) {
        calories = null;
        allergies = null;
    }
    if (!isCourse) {
        startTime = null;
        endTime = null;
        courseCoachId = null;
    }
    const product = {
        InStock, price, name, isCourse, isMeal, isGoods, startTime, endTime,
        courseCoachId, allergies, calories
    };
    try{
        const result = await Product.findByIdAndUpdate(req.params.id, product, { new: true});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});


router.delete('/:id', managerAuth, async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
