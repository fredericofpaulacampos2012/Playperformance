'use strict';
const mongoose = require('mongoose');
const Service = mongoose.model('Service');

exports.get= async()=>{
    const res = await Service.find({
        ativo:true
    },'titulo valorSessao duracao');
    return res;
};
exports.getById = async(id)=>{
    const res = await Service.findById(id);
    return res;
};
exports.create = async(body)=>{
    var service = new Service();
    service.titulo = body.titulo;
    service.descricao = body.descricao;
    service.valorSessao = body.valorSessao;
    service.valorProfissional = body.valorProfissional;
    service.duracao = body.duracao;
    await service.save();
};
exports.update = async(id,body)=>{
    await Service.findByIdAndUpdate(id,{
        $set:{
                titulo : body.titulo,
                descricao : body.descricao,
                ativo:true,
                valorSessao : body.valorSessao,
                valorProfissional : body.valorProfissional,
                duracao : body.duracao
        }
    });
};
exports.delete = async(id)=>{
    await Service.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};