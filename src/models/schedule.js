'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idServico:{        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Service'
    },
    idColaborador:{        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    idCliente:{        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    idAssinatura:{        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signature'
    },
    data:{
        type: Date,
        required:true
    },
    hora:{
        type: String,
        required:true,
        trim:true
    },
    duracao:{
        type: Number,
        required:true
    },
    observacoes:{
        type: String,
        required:true,
        trim:true
    },
    local:{
        type: String,
        required:true,
        trim:true,
        enum:['Clínica','Domicílio'],
        default:'Clínica'
    },
    tipoPagamento:{
        type: String,
        required:true,
        trim:true,
        enum:['Avulso','Plano de Assinatura'],
        default:'Avulso',
    },
    status:{
        type: String,
        required:true,
        trim:true,
        enum:['Agendado','Confirmado','Cancelado','Concluído'],
        default:'Agendado'
    },
    valor:{
        type: Number,
        required:true
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Schedule',schema);