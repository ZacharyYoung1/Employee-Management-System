const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'root',
    database: 'employee_msdb'
});

connection.connect(error => {
    if (error) throw error;

});

module.exports = connection;