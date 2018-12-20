// Imports
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')

// Configuração do server
let app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./TrilaterationTest'))
app.use(express.static('./TrilaterationMap'))
app.use(express.static('./DistanceMap'))
app.use(express.static('./ProximityMap'))
app.use(express.static('./public'))

require('./routes')(app)

// Testes
app.get('/testGet/:data', (req, res) => {
  console.log(req.params.data)
  res.send({ msg: 'GET OK' })
})

app.post('/testPost', (req, res) => {
  console.log(req.body)
  res.send({ msg: 'POST OK' })
})

// Start server na porta 8081
app.listen(80)
