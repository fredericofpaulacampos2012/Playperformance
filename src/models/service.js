'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo:{
        type: String,
        required:true,
        trim:true
    },
    descricao:{
        type: String,
        required:true,
        trim:true
    },
    valorSessao:{
        type: Number,
        required:true
    },
    duracao:{
        type: Number,
        required:true
    },
    valorProfissional:{
        type: Number,
        required:true
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Service',schema);