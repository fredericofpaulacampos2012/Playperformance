'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/expenses-repository');

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
    contract.hasMinLen(req.body.tipo,3,'O campo tipo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.descricao,10,'O campo descrição deve ter pelo menos 10 caracteres');
    contract.hasMinLen(req.body.valor,2,'O campo Valor Despesa deve ter pelo menos 2 caracteres');
    contract.hasMinLen(req.body.data,8,'O campo Data deve ter pelo menos 8 caracteres');
    contract.hasMinLen(req.body.idColaborador,6,'O campo Responsável  deve ter pelo menos 6 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body);
        res.status(201).send({ message:'Despesa cadastrada com sucesso'});      
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,req.body);
        res.status(200).send({message: 'Despesa atualizada com sucesso'});    
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
            message: 'Despesa deletada com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};