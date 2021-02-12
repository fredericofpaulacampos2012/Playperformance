'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async(body)=>{
    var order = new Order(body);
    await order.save();
};
exports.get= async()=>{
    const res = await Order.find({},'number status createDate customer items')
        .populate('customer','name')
        .populate('items.product', 'title price');
    return res;
};
exports.getById = async(id)=>{
    const res = await Order.findById(id,'number status createDate customer items')
        .populate('customer','name')
        .populate('items.product', 'title price');
    return res;
};
exports.update = async(id,body)=>{
    await Order.findByIdAndUpdate(id,{
        $set:{
                status : body.status,
        }
    });
};
exports.delete = async(id)=>{
    await Order.findByIdAndRemove(id);
};