'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    tipo:{
        type: String,
        required:true,
        enum: ["Pagamento Avulso","Pagamento a Fornecedor","Pagamento de Prestador Serviço","Pagamento a Sócio","Folha Pagamento","Despesas Gerais da Clínica"],
        default:"Pagamento Avulso",
        trim:true
    },
    descricao:{
        type: String,
        required:true,
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
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('Expense',schema);