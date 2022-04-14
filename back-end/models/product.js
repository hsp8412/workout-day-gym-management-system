const joi = require('joi');
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    stock: {
       branchId: {type: String, required: true},
       InStock : {type: Number, required: true}
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isCourse: {
        type: Boolean,
        required: true
    },
    isMeal: {
        type: Boolean,
        required: true
    },
    isGoods: {
        type: Boolean,
        required: true
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    },
    courseCoachId:{
        type: String,
        required: false
    },
    allergies: {
        type: Array,
        required: false
    },
    calories: {
        type: Number,
        required: false
    }
});

const product = mongoose.model('product', productSchema, "product");

function validateProduct(product) {
    const schema = joi.object({
        stock: {
            branchId: joi.string().required(),
            InStock: joi.number().required().min(0)
        },
        price: joi.number().required(),
        name: joi.string().required().max(30),
        isCourse: joi.boolean().required(),
        isMeal: joi.boolean().required(),
        isGoods: joi.boolean().required(),
        startTime: joi.string(),
        endTime: joi.string(),
        courseCoachId: joi.string(),
        allergies: joi.array(),
        calories: joi.number()
    });
    return schema.validate(product);
}

module.exports.product = product;
module.exports.validateProduct = validateProduct;