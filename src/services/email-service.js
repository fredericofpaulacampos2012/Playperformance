'use strict';
const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridkey);
exports.send= async(to,subject,body)=>{
    sendgrid.send({
        to: to,
        subject: subject,
        from:'fredericofpaulacampos2012@gmail.com',
        html: body
    });
};