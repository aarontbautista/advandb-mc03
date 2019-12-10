const bodyParser = require('body-parser');
const express = require('express');
const fetch = require("node-fetch");
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('../config.json');

var currNode = "centralNode";

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
        console.log(msg);

        currNode = msg;
    } else if(msg == "palawanNode") {
        console.log(msg);

        currNode = msg;
    } else if(msg == "marinduqueNode") {
        console.log(msg);

        currNode = msg;
    } else if(msg == "read") {
        console.log(msg);

        if(currNode == "centralNode") {
            centralRead();
        } else if(currNode == "palawanNode") {
            palawanRead();
        } else if(currNode == "marinduqueNode") {
            marinduqueRead();
        }
    } else if(msg == "update") {
        console.log(msg);

        if(currNode == "centralNode") {
            centralUpdate();
        } else if(currNode == "palawanNode") {
            palawanUpdate();
        } else if(currNode == "marinduqueNode") {
            marinduqueUpdate();
        }
    }
 }

 const centralRead = async () => {
    const response = await fetch('http://' + config.central.host + ':' + config.central.port + '/read');

    const data = await response.json();

    io.emit("action", data);
}

const centralUpdate = async () => {
    const response = await fetch('http://' + config.central.host + ':' + config.central.port + '/update');

    const data = await response.json();

    io.emit("action", data);
}

const marinduqueRead = async () => {
    const response = await fetch('http://' + config.marinduque.host + ':' + config.marinduque.port + '/read');

    const data = await response.json();

    io.emit("action", data);
}

const marinduqueUpdate = async () => {
    const response = await fetch('http://' + config.marinduque.host + ':' + config.marinduque.port + '/update');

    const data = await response.json();

    io.emit("action", data);
}

const palawanRead = async () => {
    const response = await fetch('http://' + config.palawan.host + ':' + config.palawan.port + '/read');

    const data = await response.json();

    io.emit("action", data);
}

const palawanUpdate = async () => {
    const response = await fetch('http://' + config.palawan.host + ':' + config.palawan.port + '/update');

    const data = await response.json();

    io.emit("action", data);
}