const joi = require('joi');
const mongoose = require('mongoose');

const branchStaffSchema = new mongoose.Schema({
    ssn: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const BranchStaff = mongoose.model('BranchStaff', branchStaffSchema, "branch_staff");

function validateBranchStaff(staff) {
    const schema = joi.object({
        ssn: joi.string().required().max(9).min(9),
        firstName: joi.string().required().max(30),
        middleName: joi.optional(),
        lastName: joi.string().required().max(30),
        phone: joi.string().required().max(10).min(10),
        address: joi.string().required().max(100),
        email: joi.string().email().required().max(50),
        salary: joi.number()
    });
    return schema.validate(staff);
}

module.exports.BranchStaff = BranchStaff;
module.exports.validateBranchStaff = validateBranchStaff;