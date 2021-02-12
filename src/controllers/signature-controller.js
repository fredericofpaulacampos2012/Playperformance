'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/signature-repository');

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
    contract.hasMinLen(req.body.idPlano,1,'O campo Plano de Assinatura não pode ser nulo');
    contract.hasMinLen(req.body.idCliente,1,'O campo Cliente não pode ser nulo');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body);
        res.status(201).send({ message:'Assinatura cadastrada com sucesso'});      
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,req.body);
        res.status(200).send({message: 'Assinatura atualizada com sucesso'});    
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
            message: 'Assinatura cancelada com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};