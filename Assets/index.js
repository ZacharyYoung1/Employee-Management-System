const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

db.connect(err => {
    if(err) {throw err}
    console.log("MySQL Connected")
});

const app = express();

app.get("/createdb" , (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, err => {  
        if(err) {
        throw err;
        }
        res.send("Database Created");
    });
});

app.get('/createemployee' , (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, first_name VARCHAR(30), last_name VARCHAR(30),  PRIMARY KEY(id))'
    db.query(sql ,err => {
        if(err) {
            throw err
        }
        res.send('Employee table created')
    });
});

app.get('/employee1', (req, res) => {
    let post = {first_name: 'John', last_name: 'Doe', title: 'Sales Lead', department:'Sales', Salary: '100000', manager: 'null'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if(err) { 
            throw err
        }
        res.send('Employee added')
    });
});

app.get('/getemployee' , (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    })
})

app.get('updateemplyee/:id' , (req, res) => {
    let newName = 'Updated Name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) { 
            throw err
        }
        res.send('Employee updated')
    })

})


app.listen('3000' , () => {
    console.log('Server Started on port 3000')
});
