const joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const branchManagerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

branchManagerSchema.methods.generateJWTToken = () => jwt.sign({_id: this._id, username: this.username}, process.env.JWT_KEY);

const BranchManager = mongoose.model('BranchManager', branchManagerSchema, "branch_manager");

function validateBranchManager(facility) {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
    }).unknown(true);
    return schema.validate(facility);
}

module.exports.BranchManager = BranchManager;
module.exports.validateBranchManager = validateBranchManager;