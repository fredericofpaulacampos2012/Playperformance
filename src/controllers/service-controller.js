'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/service-repository');

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
    contract.hasMinLen(req.body.titulo,3,'O campo título deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.descricao,10,'O campo descrição deve ter pelo menos 10 caracteres');
    contract.hasMinLen(req.body.valorSessao,2,'O campo Valor por Sessao deve ter pelo menos 2 caracteres');
    contract.hasMinLen(req.body.valorProfissional,2,'O campo Valor pago ao Profissional deve ter pelo menos 2 caracteres');
    contract.hasMinLen(req.body.duracao,1,'O campo duração  deve ter pelo menos 1 caracter');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body);
        res.status(201).send({ message:'Serviço cadastrado com sucesso'});      
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,req.body);
        res.status(200).send({message: 'Serviço atualizado com sucesso'});    
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
            message: 'Serviço deletado com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};