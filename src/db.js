const mysql = require('mysql2');

require('dotenv').config();

const database = mysql.createConnection({
    server: "db",
    user: "root",
    password: "admin",
    database: "os_controller",
    port: 3306,
    multipleStatements: true
});

module.exports = database;