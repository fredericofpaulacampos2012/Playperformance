'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    tipo:{
        type: String,
        required:true,
        enum:['Avulso','Plano de Assinatura'],
        default:'Avulso',
        trim:true
    },
    valor:{
        type: Number,
        required:true
    },
    data:{
        type: Date,
        required:true
    },
    idColaborador:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    idAssinatura:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signature'
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Income',schema);