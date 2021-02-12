'use strict'
const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');
const md5 = require('md5');
const sha1 = require('sha1');

exports.post= async(req,res,next)=>{
    let contract = new validationContract();
    contract.hasMinLen(req.body.nome,3,'O campo nome deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.senha,6,'O campo senha deve ter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.telefone,6,'O campo telefone deve ter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.role,6,'O campo função deve ter pelo menos 6 caracteres');
    contract.isEmail(req.body.email,'o email informado é inválido');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create({
            nome: req.body.nome,
            email:req.body.email,
            ativo:"true",
            cpf: req.body.cpf,
            rua: req.body.rua,
            bairro: req.body.bairro,
            uf: req.body.uf,
            cep: req.body.cep,
            cidade: req.body.cidade,
            telefone: req.body.telefone,
            role: req.body.role,
            senha: sha1(md5(req.body.senha+SALT_KEY))
        });
        emailService.send(req.body.email,'Bem vindo',global.EMAIL_TMPL.replace('{0}',req.body.nome));
        res.status(201).send({ message:'Registro Cadastrado com Sucesso'});      
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
        const data = await repository.getByName(req.params.nome);
        res.status(200).send(data);
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }  
};
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,{
            nome: req.body.nome,
            senha: sha1(md5(req.body.senha+SALT_KEY)),
            rua: req.body.rua,
            ativo:true,
            bairro: req.body.bairro,
            uf: req.body.uf,
            cep: req.body.cep,
            cidade: req.body.cidade,
            role: req.body.role,
            telefone: req.body.telefone
        });
        res.status(200).send({message: 'Registro atualizado com sucesso'});    
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
            message: 'Registro deletado com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};
exports.authenticate= async(req,res,next)=>{
    try{
        const customer = await repository.authenticate({
            email:req.body.email,
            senha: sha1(md5(req.body.senha+SALT_KEY))
        });
        if(!customer){
            res.status(404).send({ 
                message:'usuário ou senha inválidos'
            });  
            return;          
        }
        const token = await authService.generateToken({
            id:customer._id,
            nome:customer.nome,
            email:customer.email,
            role:customer.role
        })
        res.status(200).send({ 
            token:token,
            data:{
                id:customer._id,
                nome:customer.nome,
                email:customer.email,
                role:customer.role
            }
        });      
    }
    catch(e){

        console.log(e);
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};