const { validationResult } = require('express-validator');
const database = require('../db');

const initDatabase = (req, res) => {

};

const getStatus = (req, res) => {
    const sqlQuery = 'SELECT status FROM task_status';

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
};

const addSubscriber = (req, res) => {

};

module.exports = {
    initDatabase,
    getStatus,
    addSubscriber
}