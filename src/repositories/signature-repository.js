'use strict';
const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');

exports.create = async(body)=>{
    var sig = new Signature(body);
    await sig.save();
};
exports.get= async()=>{
    const res = await Signature.find({ativo:true},'idPlano cliente ultimaRenovacao pagoAte')
        .populate('cliente', 'nome')
        .populate('idPlano.servicos.idServico', 'titulo');
    return res;
};
exports.getById = async(id)=>{
    const res = await Signature.findById(id,'')
        .populate('cliente', 'nome')
        .populate('idPlano.servicos.idServico', 'titulo');
    return res;
};
exports.update = async(id,body)=>{
    await Signature.findByIdAndUpdate(id,{
        $set:{
                idPlano : body.idPlano,
                pagoAte: body.pagoAte,
                ultimaRenovacao: body.ultimaRenovacao,
                ativo:true
        }
    });
};
exports.delete = async(id)=>{
    await Signature.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};