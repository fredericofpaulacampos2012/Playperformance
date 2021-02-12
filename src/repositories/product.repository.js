'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get= async()=>{
    const res = await Product.find({
        active:true
    },'title slug price');
    return res;
};
exports.getByTag= async(tag)=>{
    const res = await Product.find({
        tags: tag,
        active:true
    },'title slug price tags');
    return res;
};
exports.getBySlug = async(slug)=>{
    const res = await Product.findOne({
        slug: slug,
        active:true
    },'title slug description price tags');
    return res;
};
exports.getById = async(id)=>{
    const res = await Product.findById(id);
    return res;
};
exports.create = async(body)=>{
    var product = new Product();
    product.title = body.title;
    product.slug = body.slug;
    product.description = body.description;
    product.price = body.price;
    product.tags = body.tags;
    await product.save();
};
exports.update = async(id,body)=>{
    await Product.findByIdAndUpdate(id,{
        $set:{
                title : body.title,
                price: body.price,
                description: body.description
        }
    });
};
exports.delete = async(id)=>{
    await Product.findByIdAndRemove(id);
};