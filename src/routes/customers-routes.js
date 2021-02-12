'use strict'
const express = require('express');
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');
const router = express.Router();

router.get('/',authService.authorize,controller.get);
router.post('/authenticate',controller.authenticate);
router.post('/',authService.authorize,controller.post);
router.put('/:id',authService.authorize,controller.put);
router.delete('/',authService.authorize,controller.delete);
router.get('/:name',authService.authorize,controller.getByName);
router.get('/admin/:id',authService.authorize,controller.getById);
module.exports = router;