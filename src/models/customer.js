'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome:{
        type: String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum: ['Cliente','Colaborador','Prestador','Financeiro','Administrador'],
        default:'Cliente'
    },
    email:{
        type: String,
        unique:true,
        required:true,
    },
    senha:{
        type: String,
        required:true,
    },
    cpf:{
        type:String,
        unique:true,
    },
    telefone:{
        type:String,
        required:true
    },
    rua:{
        type:String
    },
    bairro:{
        type:String
    },
    cidade:{
        type:String
    },
    uf:{
        type:String,
        enum: ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'],
        default:'RS'
    },
    cep:{
        type:String
    },
    ativo:{
        type:Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Customer',schema);