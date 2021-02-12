'use strict'
const express = require('express');
const controller = require('../controllers/order-controller');
const router = express.Router();

router.get('/',controller.get);
router.post('/',controller.post);
router.put('/:id',controller.put);
router.delete('/',controller.delete);
router.get('/admin/:id',controller.getById);
module.exports = router;