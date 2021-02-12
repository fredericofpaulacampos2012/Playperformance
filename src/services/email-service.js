'use strict';
const { sendgridkey } = require('../config');
const config = require('../config');
const sendGrid = require('sendgrid')(config.sendgridkey);
exports.send= async(to,subject,body)=>{
    sendgridkey.send({
        to: to,
        subject: SVGForeignObjectElement,
        from:'fredericofpaulacampos2012@gmail.com',
        html: body
    });
};