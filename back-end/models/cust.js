const joi = require('joi');
const { Double } = require('mongodb');
const mongoose = require("mongoose");



// const emergencyContactSchema =  mongoose.Schema({
//     name: { type: String, required: true },
//     contactPhoneNumber: { type: String, required: false }
// });

// const fitnessProfileSchema = mongoose.Schema({
//     height: { type: Number, required: false},
//     weight: { type: Number, required: false },
//     BFP: { type: Number, required: false},
//     BMI: { type: Number, required: false }
// });

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

const cust = mongoose.model('cust', customerSchema, "customer");


/*
{"_id":{"$oid":"6254d0364984178dc4e87af9"},
"gender":"Female",
"firstName":"Jenine",
"midName":"Koubek",
"lastName":"Rowbrey",
"phoneNumber":"1149761912",
"password":"3261e7d12d0e767096b938886aaabc39511ed31bdbd16e7291cb129d393c10f4",
"emergencyContact":
{"name":"Allissa Crips","phoneNumber":"8631958897"},
"fitnessProfile":
    {"height":{"$numberDouble":"172.1"},
    "weight":{"$numberDouble":"210.39"},
    "BFP":{"$numberDouble":"26.26"},
    "BMI":{"$numberDouble":"31.62"}}}
*/

function validateCust(customer) {
    // const emergencySchema = joi.object().keys({
    //     name : joi.string().required().max(100).min(1),
    //     contact_phone : joi.string().optional.min(10).max(10)
    // }).required();

    // const profileSchema = joi.object().keys({
    //     height: joi.Double().optional(),
    //     weight : joi.Double().optional(),
    //     BFP : joi.Double().optional(),
    //     BMI : joi.Double().optional(),
    // });

    const schema = joi.object({
        gender: joi.string().required().max(9).min(1),
        firstName: joi.string().required().max(30),
        midName: joi.optional(),
        lastName: joi.string().required().max(30),
        phoneNumber: joi.string().required().max(10).min(10),
        password: joi.string().required().max(64).min(64),
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

module.exports.cust = cust;
module.exports.validateCust = validateCust;