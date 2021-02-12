'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const sha1 = require('sha1');

exports.post= async(req,res,next)=>{
    let contract = new validationContract();
    contract.hasMinLen(req.body.name,3,'O campo nome deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.password,6,'O campo senha deve ter pelo menos 6 caracteres');
    contract.isEmail(req.body.email,'o email informado é inválido');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create({
            name: req.body.name,
            email:req.body.email,
            password: sha1(md5(req.body.password+SALT_KEY))
        });
        res.status(201).send({ message:'Cliente cadastrado com sucesso'});      
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
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
exports.getByName= async(req,res,next)=>{
    try{
        const data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }  
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,{
            name: req.body.name,
            email:req.body.email,
            password: sha1(md5(req.body.password+SALT_KEY))
        });
        res.status(200).send({message: 'Cliente atualizado com sucesso'});    
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
            message: 'Produto deletado com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};