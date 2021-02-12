'use strict';
const mongoose = require('mongoose');
const SignaturePlan = mongoose.model('SignaturePlan');

exports.create = async(body)=>{
    var sigplan = new SignaturePlan(body);
    await sigplan.save();
};
exports.get= async()=>{
    const res = await SignaturePlan.find({ativo:true},'servicos valor periodicidade')
        .populate('servicos.idServico', 'titulo');
    return res;
};
exports.getById = async(id)=>{
    const res = await SignaturePlan.findById(id,'')
        .populate('servicos.idServico', 'titulo');
    return res;
};
exports.update = async(id,body)=>{
    await SignaturePlan.findByIdAndUpdate(id,{
        $set:{
                servicos : body.servicos,
                valor: body.valor,
                periodicidade: body.periodicidade,
                ativo:true
        }
    });
};
exports.delete = async(id)=>{
    await SignaturePlan.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};