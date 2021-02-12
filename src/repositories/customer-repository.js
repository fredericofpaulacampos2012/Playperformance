'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(body)=>{
    var customer = new Customer();
    customer.nome = body.nome;
    customer.email = body.email;
    customer.senha = body.senha;
    customer.cpf = body.cpf;
    customer.telefone = body.telefone;
    customer.rua = body.rua;
    customer.bairro = body.bairro;
    customer.cidade = body.cidade;
    customer.uf = body.uf;
    customer.cep = body.cep;
    customer.role = body.role;
    customer.ativo = body.ativo;
    await customer.save();
};
exports.get= async()=>{
    const res = await Customer.find({

    },'nome email rua bairro cidade uf cep telefone role');
    return res;
};
exports.getByName = async(name)=>{
    const res = await Customer.find({
        nome: name
    },'');
    return res;
};
exports.getById = async(id)=>{
    const res = await Customer.findById(id);
    return res;
};
exports.update = async(id,body)=>{
    await Customer.findByIdAndUpdate(id,{
        $set:{
                nome : body.nome,
                senha: body.senha,
                rua: body.rua,
                ativo:body.ativo,
                bairro: body.bairro,
                cidade:body.cidade,
                uf: body.uf,
                cep: body.cep,
                role:body.role,
                telefone: body.telefone
        }
    });
};
exports.delete = async(id)=>{
    await Customer.findByIdAndUpdate(id,{
        $set:{
                ativo: false
        }
    });
};
exports.authenticate = async(data)=>{
    const res = await Customer.findOne({
        ativo:true,
        email:data.email,
        senha:data.senha
    });
    return res;
};