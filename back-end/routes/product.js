const express = require('express');
const router = express.Router();
const { Product, validateProduct} = require('../models/prod');
const joi = require("joi");

router.get('/', async (req, res) => {
    const prod = await Product.find();
    res.send(prod);
});


router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {stock:{branchId, InStock}, price, name, isCourse, isMeal, isGoods, startTime, endTime, 
        courseCoachId, allergies, calories  } = req.body;
    const prod = new product({
        stock:{branchId, InStock}, price, name, isCourse, isMeal, isGoods, startTime, endTime, 
        courseCoachId, allergies, calories
    });
    const result = await prod.save();
    res.send(result);
});


router.get('/:id', async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {stock:{branchId, InStock}, price, name, isCourse, isMeal, isGoods, startTime, endTime, 
        courseCoachId, allergies, calories  } = req.body;
    const product = {
        stock:{branchId, InStock}, price, name, isCourse, isMeal, isGoods, startTime, endTime, 
        courseCoachId, allergies, calories  
    };
    try{
        const result = await Product.findByIdAndUpdate(req.params.id, product, { new: true});
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (e) {
        res.status(400).send("Bad Request");
    }
});

module.exports = router;
