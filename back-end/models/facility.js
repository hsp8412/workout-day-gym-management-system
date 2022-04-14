const joi = require('joi');
const mongoose = require('mongoose');

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
        renterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
        startDate: {type: Date, required: false},
        endDate: {type: Date, required: false}
    }
});

const Facility = mongoose.model('Facility', facilitySchema, "facility");

function validateFacility(facility) {
    const schema = joi.object({
        isEquipment: joi.boolean().required(),
        isTemporaryLocker: joi.boolean().required(),
        price: joi.number().required(),
        condition: joi.number().required().max(10),
        type: joi.string().required(),
        locker_number: joi.number().optional(),
        rental: {
            renterId: joi.string().optional(),
            startDate : joi.date().optional(),
            endDate: joi.date().optional()
        }
    });
    return schema.validate(facility);
}

module.exports.Facility = Facility;
module.exports.validateFacility = validateFacility;