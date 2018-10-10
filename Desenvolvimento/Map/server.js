// Imports
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')


// Configuração do server
let app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))

require('./routes')(app)

app.get('/testGet/:data', (req, res) => {
  console.log("CHEGOU REQUEST: " + req.params.data)
  res.send({ msg: 'GET OK' })
})

app.post('/testPost', (req, res) => {
  let data = req.body
  console.log(data)
  res.send({ msg: 'POST OK' })
})

// Start server na porta 8081
app.listen(80)


