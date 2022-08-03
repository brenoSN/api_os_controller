const express = require('express');
const controller = require('../controllers/controllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/init', controller.initDatabase);

router.get('/status', controller.getStatus);

router.put('/tasks', body('userId').not().isEmpty().escape(), controller.getTasks);

router.put('/login', body('name').not().isEmpty().escape(), body('password').not().isEmpty().escape(), controller.login);

router.post('/subscribe', 
    body('id').not().isEmpty().escape(),
    body('name').not().isEmpty().escape(),
    body('description'),
    body('creationDate').not().isEmpty().escape(),
    body('lastEditDate').not().isEmpty().escape(),
    body('time').not().isEmpty().escape(),
    body('status').not().isEmpty().escape(),
    body('userId').not().isEmpty().escape(),
    controller.addSubscriber    
);

router.post('/addstatus', 
    body('id').not().isEmpty().escape(),
    body('status').not().isEmpty().escape(),
    controller.addStatus    
);

router.post('/addUser', 
    body('name').not().isEmpty().escape(),
    body('password').not().isEmpty().escape(),
    controller.addUser    
);

router.put('/update', 
    body('id').not().isEmpty().escape(),
    body('name').not().isEmpty().escape(),
    body('description'),
    body('creationDate').not().isEmpty().escape(),
    body('lastEditDate').not().isEmpty().escape(),
    body('time').not().isEmpty().escape(),
    body('status').not().isEmpty().escape(),
    controller.updateTask    
);

router.delete('/delete',body('id').not().isEmpty().escape(), controller.deleteTask);


module.exports = router;