'use strict';
const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');

exports.create = async(body)=>{
    var sig = new Signature(body);
    await sig.save();
};
exports.get= async()=>{
    const res = await Signature.find({ativo:true},'idPlano idCliente ultimaRenovacao pagoAte')
        .populate('idCliente', 'nome')
        .populate({path:'idPlano',populate:{path:'servicos.idServico',select:{titulo:1}},select:{idPlano:1}});
    return res;
};
exports.getById = async(id)=>{
    const res = await Signature.findById(id,'')
        .populate('idCliente', 'nome')
        .populate({path:'idPlano',populate:{path:'servicos.idServico',select:{titulo:1}},select:{idPlano:1}});
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