'use strict'
const express = require('express');
const controller = require('../controllers/signatureplan-controller');
const authService = require('../services/auth-service');
const router = express.Router();

router.get('/',authService.authorize,controller.get);
router.get('/admin/:id',authService.authorize,controller.getById);
router.post('/',authService.authorize,controller.post);
router.put('/:id',authService.authorize,controller.put);
router.delete('/',authService.authorize,controller.delete);
module.exports = router;