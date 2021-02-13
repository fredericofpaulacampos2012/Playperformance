'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/schedule-repository');

exports.get= async(req,res,next)=>{
    try{
        const data = await repository.get();
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.getById= async(req,res,next)=>{
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }  
};
exports.post= async(req,res,next)=>{
    let contract = new validationContract();
    contract.hasMinLen(req.body.data,8,'O campo data deve ser válido');
    contract.hasMinLen(req.body.hora,5,'O campo hora deve ser válido');
    contract.hasMinLen(req.body.idServico,2,'O campo Serviço não pode ser nulo');
    contract.hasMinLen(req.body.idColaborador,2,'O campo Profissional não pode ser nulo');
    contract.hasMinLen(req.body.idCliente,2,'O campo Cliente não pode ser nulo');
    contract.hasMinLen(req.body.duracao,1,'O campo duração não pode ser nulo');
    contract.hasMinLen(req.body.valor,1,'O campo valor não pode ser nulo');
    contract.hasMinLen(req.body.local,1,'O campo local não pode ser nulo');
    contract.hasMinLen(req.body.tipoPagamento,1,'O campo Tipo de Pagamento não pode ser nulo');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body);
        res.status(201).send({ message:'Agendamento cadastrado com sucesso'});      
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,req.body);
        res.status(200).send({message: 'Agendamento atualizado com sucesso'});    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.delete = async(req,res,next)=>{
    try{
        await repository.delete(req.body.id);
        res.status(200).send({
            id: req.body.id,
            message: 'Agendamento deletado com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};