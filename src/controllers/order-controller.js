'use strict'
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.post= async(req,res,next)=>{
    let data = {
        customer:req.body.customer,
        number: guid.raw().substring(0,6),
        items: req.body.items
    }
    try{
        await repository.create(data);
        res.status(201).send({ message:'Pedido cadastrado com sucesso'});      
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
exports.put= async(req,res,next)=>{
    try{
        await repository.update(req.params.id,req.body);
        res.status(200).send({message: 'Pedido atualizado com sucesso'});    
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
            message: 'Pedido deletado com sucesso'
        });    
    }
    catch(e){
        res.status(500).send({message: "Falha ao processar sua requisição",data:e});
    }
};