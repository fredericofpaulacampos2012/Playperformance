'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idPlano:{        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'SignaturePlan'
    },
    idCliente:{        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    dataContratacao:{
        type:Date,
        required:true
    },
    pagoAte:{
        type:Date,
        required:true
    },
    ultimaRenovacao:{
        type:Date,
        required:true
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Signature',schema);