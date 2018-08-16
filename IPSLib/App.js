const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
 
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Running! :D ');
});

app.get('/testWithParam/:data', (req, res) => {
    console.log("Oi");
    res.send("Test OK. Data: " + req.params.data);
});

app.get('/fromIonic/get/:data', (req, res) => {
    res.send("faz aqui né nego");
    // map.addQR(gson.fromJson(request.params(":data"), QR.class));
    // map.show();
    // System.out.println("Get received: " + request.params(":data"));
    // return "Get received from ionic: " + request.params(":data");
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
