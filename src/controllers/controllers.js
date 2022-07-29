const { validationResult } = require('express-validator');
const database = require('../db');

const initDatabase = (req, res) => {

};

const getStatus = (req, res) => {
    const sqlQuery = 'SELECT * FROM task_status';

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
};


const addSubscriber = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const task = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            creationDate: req.body.creationDate,
            lastEditDate: req.body.lastEditDate,
            time: req.body.time,
            status: req.body.status,
        };

        const sqlQuery = 'INSERT INTO task SET ?';

        database.query(sqlQuery, task, (err, row) => {
            if (err) throw err;

            res.send('Subscribed successfully!');
        });
    }
};

module.exports = {
    initDatabase,
    getStatus,
    addSubscriber
}