const express = require('express');
const controller = require('../controllers/controllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/init', controller.initDatabase);
router.get('/status', controller.getStatus);
router.post('/subscribe', 
    body('id').not().isEmpty().escape(),
    body('name').not().isEmpty().escape(),
    body('description'),
    body('creationDate').not().isEmpty().escape(),
    body('lastEditDate').not().isEmpty().escape(),
    body('time').not().isEmpty().escape(),
    body('status').not().isEmpty().escape(),
    controller.addSubscriber    
);

module.exports = router;