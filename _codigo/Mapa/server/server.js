let express = require('express')
var cors = require('cors')
let Fila = require('./Fila.js');

let fila = new Fila();
let app = express()
app.use(cors({
  origin: '*',
}));

createTestData()

app.get('/add/:dado', (req, res) => {
  let dado = req.params.dado
  fila.add(dado)
  res.send({
    dado: 'inserido'
  })
})

app.get('/get', (req, res) => {
  let dado = fila.get()

  if (dado) {
    res.send(dado);
  } else {
    res.send({
      dado: 'vazia'
    })
  }
  
})

app.get('/empty', (req, res) => {
  let empty = fila.empty()
  res.send({
    dado: empty
  })
})

app.get('/reset', (req, res) => {
  fila.reset()
  res.send({
    dado: 'resetada'
  })
})

app.get('/getAll', (req, res) => {
  let dados = fila.getAll()

  if (dados) {
    res.send({
      fila: dados
    });
  } else {
    res.send({
      dado: 'vazia'
    })
  }
})

app.get('/resetTest', (req, res) => {
  createTestData()
  res.send('criado')
})

 
app.get('/', function (req, res) {
  console.log('Server online!')
  res.send('Server online!')
})
 
app.listen(8081)

function createTestData () {
  // {"id":"ABC0001","rssi":54}
  // {"id":"ABC0001","rssi":51}
  // {"id":"ABC0001","rssi":57}
  // {"id":"ABC0001","rssi":62}

  for (let i = 0; i < 100; i++) {
    fila.add({ x: i*5, y: i*2 })
  }

}