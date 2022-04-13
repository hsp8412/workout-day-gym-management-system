const { boolean, number } = require('joi');
const joi = require('joi');
const mongoose = require("mongoose");

/*
{"isEquipment":false,
"isTemporaryLocker":true,
"price":{"$numberDouble":"198.31"},
"condition":{"$numberInt":"1"},
"type":"Locker",
"locker_number":{"$numberInt":"985"},
"rental":{
    "renterId":{"$oid":"6254ad89fc13ae3195000096"},
"startDate":{"$date":{"$numberLong":"0"}},
"endDate":{"$date":{"$numberLong":"0"}}}}
*/ 


const facilitySchema = new mongoose.Schema({
    isEquipment: {
        type: Boolean,
        required: true
    },
    isTemporaryLocker: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    locker_number: {
        type: Number,
        required: false
    },
    rental: {
       // rentalId: {type: Object, required: true},
        startDate: {type: Date, required: false},
        endDate: {type: Date, required: false}
    }
});

const facilities = mongoose.model('facilities', facilitySchema, "facility");
/*
{"isEquipment":false,
"isTemporaryLocker":true,
"price":{"$numberDouble":"198.31"},
"condition":{"$numberInt":"1"},
"type":"Locker",
"locker_number":{"$numberInt":"985"},
"rental":{
    "renterId":{"$oid":"6254ad89fc13ae3195000096"},
"startDate":{"$date":{"$numberLong":"0"}},
"endDate":{"$date":{"$numberLong":"0"}}}}
*/ 
function validatefacility(faci) {
    const schema = joi.object({
        isEquipment: joi.boolean().required(),
        isTemporaryLocker: joi.boolean().required(),
        price: joi.number().required(),
        condition: joi.number().required().max(10),
        type: joi.string().required(),
        locker_number: joi.number().optional(),
        rental: {
          //  renterId : joi.object().required(),
            startDate : joi.date().optional(),
            endDate: joi.date().optional()
        }
        
    });
    return schema.validate(faci);
}

module.exports.facilities = facilities;
module.exports.validatefacility = validatefacility;