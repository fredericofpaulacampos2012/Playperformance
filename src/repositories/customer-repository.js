'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(body)=>{
    var customer = new Customer();
    customer.name = body.name;
    customer.email = body.email;
    customer.password = body.password;
    await customer.save();
};
exports.get= async()=>{
    const res = await Customer.find({
    },'name email');
    return res;
};
exports.getByName = async(name)=>{
    const res = await Customer.find({
        name: name
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
                name : body.name,
                password: body.password
        }
    });
};
exports.delete = async(id)=>{
    await Customer.findByIdAndRemove(id);
};