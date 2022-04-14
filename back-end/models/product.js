const joi = require('joi');
const mongoose = require("mongoose");

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

const productSchema = new mongoose.Schema({
    stock: {
       branchId: {type: String, required: true},
       // renterId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
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
        required: function() {return this.isCourse == true;}
        //required: false
    },
    endTime: {
        type: String,
        //required: false
        required: function() {return this.isCourse == true;}
    },
    courseCoachId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'BranchStaff', 
        //required: false
        required: function() {return this.isCourse == true;}
    },
    allergies: {
        type:Array,
        //required: false
        required: function() {return this.isMeal == true;}
    },
    calories: {
        type: Number,
        //required: false
        required: function() {return this.isMeal == true;}
    }
});

// new Schema({
//     a: String,
//     b: {
//       type: String,
//       required: function() { return this.a === 'test'; } // Only required if a equals 'test'
//     }
//   });

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
const Product = mongoose.model('product', productSchema, "product");


function validateProduct(product) {

    const schema = joi.object({
        stock: {
            branchId: joi.string().optional(),
            InStock: joi.number().required().min(0)
        },
        price: joi.number().required(),
        name: joi.string().required().max(30),
        isCourse: joi.boolean().required(),
        isMeal: joi.boolean().required(),
        isGoods: joi.boolean().required(),
        startTime: joi.string().optional(),
        endTime: joi.string().optional(),
        courseCoachId: joi.optional(),
        allergies: joi.array().optional(),
        calories: joi.number().optional()
    });
    return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;
