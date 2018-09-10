console.log("Starting server...");

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
let logger = require('morgan');
let methodOverride = require('method-override')
let cors = require('cors');
let util = require('util') 
let Graph = require('./model/Graph');

app.use(logger('dev')); 
app.use(methodOverride());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let bot;

// set static content
app.use(express.static('public'));

// Create socket
let io = require('socket.io').listen(server);
setInterval(heartbeat, 30);

// This will send bot to all clients
function heartbeat() {
    let data = {bot: bot};
    io.sockets.emit('heartbeat', data);
}
  
// Connection management
io.sockets.on('connection', (socket) => {
    console.log("New client: " + socket.id);

    socket.on('start', (data) => {});
    socket.on('update', (data) => {});
});
  
app.post('/testPost', (req, res) => {
    let receivedData = req.body;
    console.log("post param: " + JSON.stringify(receivedData));

    try {
        let readLocationsReturn = readLocations.push(receivedData);
        res.send("POST SUCCESS. firebase key: " + readLocationsReturn.key);
    } catch(e) {
        console.error(e);
        res.send("ERROR: " + e);
    }
});

app.post('/addLocation', (req, res) => {
    let receivedData = req.body;
    console.log("post param: " + JSON.stringify(receivedData));
    res.send('Location added');
});


// Main route
app.get('/', (req, res) => {
    res.send('Server is Running! :D ');
});

// Is alive?
app.get('/isAlive', (req, res) => {
    res.send('YES!');
});

// Start server 
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server listening on port %s', port);
});

