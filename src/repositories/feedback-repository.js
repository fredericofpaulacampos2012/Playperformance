'use strict';
const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');

exports.get= async()=>{
    const res = await Feedback.find({
        ativo:true
    },'data nota observacoes idAgendamento')
        .populate({path:'idAgendamento',populate:{path:'idColaborador',select:{nome:1}},select:{idColaborador:1}});
    return res;
};
exports.getById = async(id)=>{
    const res = await Feedback.findById(id)
        .populate({path:'idAgendamento',populate:{path:'idColaborador',select:{nome:1}},select:{idColaborador:1}});
    return res;
};
exports.create = async(body)=>{
    var feedback = new Feedback();
    feedback.data = body.data;
    feedback.idAgendamento = body.idAgendamento;
    feedback.nota = body.nota;
    feedback.observacoes = body.observacoes;
    feedback.ativo = true;
    await feedback.save();
};
exports.update = async(id,body)=>{
    await Feedback.findByIdAndUpdate(id,{
        $set:{
                nota : body.nota,
                observacao : body.observacao,
                ativo:true
        }
    });
};
exports.delete = async(id)=>{
    await Feedback.findByIdAndUpdate(id,{
        $set:{
                ativo:false
        }
    });
};