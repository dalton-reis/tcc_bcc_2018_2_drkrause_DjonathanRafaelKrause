console.log("Starting server...");

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var firebase = require("firebase");
var util = require('util') 
var Map = require('./model/Map');

app.use(logger('dev')); 
app.use(methodOverride());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmrdJHwZllXploQuqDjuAcDYe9fT-eQTU",
    authDomain: "ipsdatafirebase.firebaseapp.com",
    databaseURL: "https://ipsdatafirebase.firebaseio.com",
    projectId: "ipsdatafirebase",
    storageBucket: "",
    messagingSenderId: "425637406328"
  };
firebase.initializeApp(config);

let database = firebase.database();
let readLocations = database.ref('readLocations')

// Create map
let map = new Map();

app.post('/postReadLocation', (req, res) => {
    let receivedData = JSON.stringify(req.body);

    map.addLocation(receivedData);
    console.log("Data received from device: " + receivedData);
    try {
        let readLocationsReturn = readLocations.push(receivedData);
        res.send("POST SUCCESS: firebase key: " + readLocationsReturn.key);
    } catch(e) {
        console.error(e);
        res.send("ERROR: " + e);
    }
});

// Test route
app.get('/testGet/:data', (req, res) => {
    let receivedData = req.params.data;
    console.log("get param: " + receivedData);

    try {
        let readLocationsReturn = readLocations.push(receivedData);
        res.send("GET SUCCESS: firebase key: " + readLocationsReturn.key);
    } catch(e) {
        console.error(e);
        res.send("ERROR: " + e);
    }
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
    map.addLocation(receivedData);
    map.show();
    res.send('Location added');
});

app.post('/resetMap', (req, res) => {
    map.resetMap();
    map.show();
    res.send('Map reseted');
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
