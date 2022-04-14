const express = require('express');
const router = express.Router();
const { product, validateProduct} = require('../models/product');
const joi = require("joi");

router.get('/', async (req, res) => {
    const prod = await product.find();
    res.send(prod);
});

/*
{"_id":{"$oid":"6254d36f4984178dc4ea59e2"},
"stock":{"branchId":{"$oid":"6254bed2fc13ae724a0000c3"},
"InStock":{"$numberInt":"552"}},
"price":{"$numberDouble":"257.73"},
"name":"Basic Cardio",
"isCourse":true,
"isMeal":false,
"isGoods":false,
"startTime":"10:00 AM",
"endTime":"10:50 AM",
"courseCoachId":{"$oid":"6254972d4984178dc4c7a6f4"},
"allergies":null,
"calories":{"$numberInt":"453"}}
*/
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
}
);


module.exports = router;