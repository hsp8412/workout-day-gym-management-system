const joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const customerSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    midName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emergencyContact: {
        contact_name: { type: String, required: false },
        contactPhoneNumber: { type: String, required: false }
    },
    fitnessProfile: {
        height: { type: Number, required: false},
        weight: { type: Number, required: false },
        BFP: { type: Number, required: false},
        BMI: { type: Number, required: false }
    }
});

customerSchema.methods.generateJWTToken = () => jwt.sign({id: this._id, }, process.env.JWT_KEY);

const Customer = mongoose.model('Customer', customerSchema, "customer");

function validateCustomer(customer) {
    const schema = joi.object({
        gender: joi.string().required().max(9).min(1),
        firstName: joi.string().required().max(30),
        midName: joi.optional(),
        lastName: joi.string().required().max(30),
        phoneNumber: joi.string().required().max(10).min(10),
        email: joi.string().email().required(),
        password: joi.string().required(),
        emergencyContact:{
            contact_name : joi.string().optional(),
            contactPhoneNumber : joi.string().optional()
        },
        fitnessProfile: {
            height: joi.number().optional(),
            weight : joi.number().optional(),
            BFP : joi.number().optional(),
            BMI : joi.number().optional()
        }
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;