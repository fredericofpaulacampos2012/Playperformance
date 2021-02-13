'use strict';
const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');

exports.get= async()=>{
    const res = await Schedule.find({
        ativo:true
    },'data hora duracao valor tipoPagamento local status idServico idColaborador idCliente')
        .populate('idColaborador', 'nome')
        .populate('idCliente', 'nome rua bairro cidade uf')
        .populate('idServico', 'titulo');
    return res;
};
exports.getById = async(id)=>{
    const res = await Schedule.findById(id)
        .populate('idColaborador idCliente', 'nome')
        .populate('idServico', 'titulo');    return res;
};
exports.create = async(body)=>{
    var schedule = new Schedule();
    schedule.data = body.data;
    schedule.hora = body.hora;
    schedule.idServico = body.idServico;
    schedule.duracao = body.duracao;
    schedule.valor = body.valor;
    schedule.idColaborador = body.idColaborador;
    schedule.idCliente = body.idCliente;
    schedule.tipoPagamento = body.tipoPagamento;
    schedule.idAssinatura = body.idAssinatura;
    schedule.local = body.local;
    schedule.observacoes = body.observacoes;
    schedule.status = body.status;
    await schedule.save();
};
exports.update = async(id,body)=>{
    await Schedule.findByIdAndUpdate(id,{
        $set:{
                data : body.data,
                hora : body.hora,
                duracao:body.duracao,
                valor:body.valor,
                idColaborador : body.idColaborador,
                tipoPagamento : body.tipoPagamento,
                local : body.local,
                observacoes : body.observacoes,
                status : body.status,
                ativo : true
        }
    });
};
exports.delete = async(id)=>{
    await Schedule.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};