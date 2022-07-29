const express = require('express');
const controller = require('../controllers/controllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/init', controller.initDatabase);
router.get('/status', controller.getStatus);
router.post('/subscribe', 
    body('name').not().isEmpty().escape(),
    controller.addSubscriber    
);

module.exports = router;