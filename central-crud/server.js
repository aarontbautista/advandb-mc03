const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');

var config = require('../config.json');

var connection = mysql.createConnection({
    host     : config.central.host,
    user     : config.central.username,
    password : config.central.password,
    database : config.central.database
});
connection.connect();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(config.central.port, () => {
    console.log("Central CRUD");
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/read', (req, res) => {    
    connection.query(config.central.read, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});

app.get('/update', (req, res) => {    
    connection.query(config.central.update.replace("<param>", req.query.param), function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});