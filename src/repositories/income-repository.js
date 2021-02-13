'use strict';
const mongoose = require('mongoose');
const Income = mongoose.model('Income');

exports.get= async()=>{
    const res = await Income.find({
        ativo:true
    },'tipo valor data idColaborador')
        .populate('idColaborador', 'nome');
    return res;
};
exports.getById = async(id)=>{
    const res = await Income.findById(id)
        .populate('idColaborador', 'nome')
        .populate({path:'idAssinatura',populate:{path:'idPlano',populate:{path:'servicos.idServico',select:{titulo:1}}}});
    return res;
};
exports.create = async(body)=>{
    var income = new Income();
    income.tipo = body.tipo;
    income.valor = body.valor;
    income.data = body.data;
    income.idColaborador = body.idColaborador;
    income.idAssinatura = body.idAssinatura;
    await income.save();
};
exports.update = async(id,body)=>{
    await Income.findByIdAndUpdate(id,{
        $set:{
                tipo : body.tipo,
                valor : body.valor,
                ativo:true,
                data : body.data,
                idColaborador : body.idColaborador,
                idAssinatura : body.Assinatura
        }
    });
};
exports.delete = async(id)=>{
    await Income.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};