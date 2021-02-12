'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    servicos:[{
        idServico:{        
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Service'
        },
        totalSessoes:{
            type:Number,
            required:true
        }
    }],
    valor:{
        type: Number,
        required:true
    },
    periodicidade:{
        type: Number,
        required:true
    },
    ativo:{
        type: Boolean,
        required:true,
        default:true
    }
});
module.exports = mongoose.model('SignaturePlan',schema);