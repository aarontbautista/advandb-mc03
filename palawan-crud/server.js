const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');
var axios = require('axios')
var status = 200;

var config = require('../config.json');

var connection = mysql.createConnection({
    host     : config.palawan.host,
    user     : config.palawan.username,
    password : config.palawan.password,
    database : config.palawan.database
});
connection.connect();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(config.palawan.port, () => {
    console.log("Palawan CRUD");
    console.log(`Express running → PORT ${server.address().port}`);

    // add url here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //axios.get('url');
});

app.get('/', (req, res) => {    
    res.sendStatus(status);
});

app.get('/toggle', (req, res) => {       
    if(status == 200) {
        status = 404;
    } else {
        status = 200;

        // add url here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //axios.get('url');
    }

    res.sendStatus(status);
});

app.get('/read', (req, res) => {    
    connection.query(config.palawan.read, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});
const transaction = async (param, path) => {
    //console.log('http://' + config.transactions.ip + ':' + config.transactions.port + '/'+path+'?param='+param);
    //const response = await fetch('http://localhost:8000/post_pal?param=59');
    axios.get('http://' + config.transactions.ip + ':' + config.transactions.port + '/'+path+'?param='+param);
}  
app.get('/update', (req, res) => {    
    connection.query(config.palawan.update.replace("<param>", req.query.param), function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});
app.get('/updateT', (req, res) => {    
    connection.query(config.palawan.update.replace("<param>", req.query.param), function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
    transaction(req.query.param, "post_pal");
});