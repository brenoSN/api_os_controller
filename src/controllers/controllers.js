const { validationResult } = require('express-validator');
const database = require('../db');

const initDatabase = (req, res) => {

};

function generate(n) {
    var add = 1,
      max = 12 - add;
  
    if (n > max) {
      return generate(max) + generate(n - max);
    }
  
    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically 
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return ("" + number).substring(add);
}

const getStatus = (req, res) => {
    const sqlQuery = 'SELECT * FROM task_status';

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
};

const getTasks = (req, res) => {
    const sqlQuery = 'SELECT T.id, T.name, T.description, T.creationDate, T.lastEditDate, T.time, T.status' +
    ' from task T INNER JOIN regUserTasks R ON T.id = R.taskId INNER JOIN '+
    ' user U ON U.id = R.userId WHERE R.userId =' + req.body.userId;
    
    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json(result);
    });
};

const login = (req, res) => {
    const sqlQuery = 'SELECT password FROM user WHERE name = ' + '"' + req.body.name + '"' + ' AND password = ' + '"' + req.body.password + '"';
    

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.json(result.length == 1 && req.body.password == result[0].password);
    });
};

const deleteTask = (req, res) => {

    const sqlQuery = 'DELETE FROM task WHERE id = ' + req.body.id;

    database.query(sqlQuery, (err, row) => {
        if (err) throw err;

        res.json(row);
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

        const regTaskUser = {
            taskId: req.body.id,
            userId: req.body.userId
        }

        const sqlQuery = 'INSERT INTO task SET ?; INSERT INTO regUserTasks SET ?';

        database.query(sqlQuery, [task, regTaskUser] , (err, row) => {
            if (err) throw err;

            res.send('Subscribed successfully!');
        });
    }
};

const updateTask = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const id = parseInt(req.body.id);
        //const description = req.body.description.substring(0,250);
        const task = {
            name: req.body.name,
            description: req.body.description,
            creationDate: req.body.creationDate,
            lastEditDate: req.body.lastEditDate,
            time: req.body.time,
            status: req.body.status,
        };
        //const sqlQuery = 'UPDATE task SET description = ' + '"' +description + '"' + 'WHERE id= '+ id;
        const sqlQuery = 'UPDATE task SET ? WHERE id = ' + id;
        database.query(sqlQuery, task, (err, row) => {
            if (err) throw err;

            res.send('change successfully!');
        });
    }
};



const addStatus = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const status = {
            id: req.body.id,
            status: req.body.status,
        };

        const sqlQuery = 'INSERT INTO task_status SET ?';

        database.query(sqlQuery, status, (err, row) => {
            if (err) throw err;

            res.send('Subscribed successfully!');
        });
    }
};

const addUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const status = {
            id: generate(8),
            name: req.body.name,
            password: req.body.password
        };
        try {
            const sqlQuery = 'INSERT INTO user SET ?';

            database.query(sqlQuery, status, (err, row) => {
                if (err) throw err;
    
                res.send('Subscribed successfully!');
            });
        }
        catch (err) {
            logMyErrors(err);
        }
    }
};

module.exports = {
    initDatabase,
    getStatus,
    getTasks,
    addSubscriber,
    updateTask,
    deleteTask,
    addStatus,
    addUser,
    login
}