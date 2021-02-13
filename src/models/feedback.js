'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nota:{
        type: String,
        required:true,
        enum: ["0","1","2","3","4","5","6","7","8","9","10"],
        default:"5",
    },
    data:{
        type: Date,
        required:true,
        trim:true
    },
    observacoes:{
        type: String,
        required:true
    },
    idAgendamento:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Schedule'
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Feedback',schema);