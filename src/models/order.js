'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number:{
        type: String,
        required:true,
    },
    createDate:{
        type: Date,
        required:true,
        default: Date.now
    },
    status:{
        type: String,
        required:true,
        enum: ['created','done'],
        default:'created'
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    items:[{
        quantity:{
            type: Number,
            required:true,
            default:1
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Product'
        }
    }]
});
module.exports = mongoose.model('Order',schema);