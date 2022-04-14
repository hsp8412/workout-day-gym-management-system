const mongoose = require('mongoose');
const joi = require('joi');

const branchSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    yearlyProfit: {
        type: Number,
        required: true
    },
    managerId: {
        type: mongoose.Types.ObjectId,
        ref: "BranchStaff"
    }
});

const Branch = mongoose.model("Branch", branchSchema, "branch");

function  validateBranch(branch) {
    const schema = {
        location: joi.string().required(),
        numberOfMembers: joi.number().required(),
        yearlyProfit: joi.number().required(),
        managerId: joi.string().required()
    };

    return schema.validate(branch);
}

module.exports.Branch = Branch;
module.exports.validateBranch = validateBranch;