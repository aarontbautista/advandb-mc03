const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('../config.json');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : config.central.host,
    user     : config.central.username,
    password : config.central.password,
    database : config.central.database
});

connection.connect();

io.on('connection', function(socket) {
	console.log('Client connected');

	client = socket;

	socket.on('action', function(msg){
		action(msg);
	});
});

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

const serverListener = server.listen(8080, () => {
    console.log("Client Server");
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {    
    res.sendFile('/views/index.html');
});

function action(msg) {
    if(msg == "centralNode") {
        connection = mysql.createConnection({
            host     : config.central.host,
            user     : config.central.username,
            password : config.central.password,
            database : config.central.database
        });

        connection.connect();

        console.log(msg);
    } else if(msg == "palawanNode") {
        connection = mysql.createConnection({
            host     : config.palawan.host,
            user     : config.palawan.username,
            password : config.palawan.password,
            database : config.palawan.database
        });

        connection.connect();

        console.log(msg);
    } else if(msg == "marinduqueNode") {
        connection = mysql.createConnection({
            host     : config.marinduque.host,
            user     : config.marinduque.username,
            password : config.marinduque.password,
            database : config.marinduque.database
        });

        connection.connect();

        console.log(msg);
    }
 }