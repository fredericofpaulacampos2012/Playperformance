'use strict';
const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.get= async()=>{
    const res = await Expense.find({
        ativo:true
    },'tipo descricao valor data idColaborador')
    .populate('idColaborador','nome');
    return res;
};
exports.getById = async(id)=>{
    const res = await Expense.findById(id)
    .populate('customer','name');
    return res;
};
exports.create = async(body)=>{
    var expense = new Expense();
    expense.tipo = body.tipo;
    expense.descricao = body.descricao;
    expense.valor = body.valor;
    expense.data = body.data;
    expense.ativo = true;
    expense.idColaborador = body.idColaborador;
    await expense.save();
};
exports.update = async(id,body)=>{
    await Expense.findByIdAndUpdate(id,{
        $set:{
                tipo : body.tipo,
                descricao : body.descricao,
                ativo:true,
                valor : body.valor,
                data : body.data,
                idColaborador : body.idColaborador
        }
    });
};
exports.delete = async(id)=>{
    await Expense.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};