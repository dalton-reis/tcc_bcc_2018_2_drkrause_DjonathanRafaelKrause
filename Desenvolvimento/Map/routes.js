module.exports = function (app) {
  // Imports
  let Queue = require('./Queue.js')
  let queue = new Queue()

  // add beacons na fila
  app.get('/add/:data', (req, res) => {
    queue.add(req.params.data)
    res.send({ msg: 'inserido' })
  })

  // add lista de beacons na fila
  app.post('/addAll', (req, res) => {
    if (req.body !== undefined && req.body !== null) {
      queue.addAll(req.body)
      res.send({ msg: 'dados inseridos' })
    } else {
      res.send({ msg: 'nenhum para inserir' })
    }
  })

  // Remove o primeiro dado da fila
  app.get('/remove', (req, res) => {
    let data = queue.remove()
  
    if (data) {
      res.send(data);
    } else {
      res.send({})
    }
  })

  // Limpa fila
  app.get('/reset', (req, res) => {
    queue.reset()
    res.send({ msg: 'resetada' })
  })
  
  // Mostra todos os dados da queue (nao remove)
  app.get('/show', (req, res) => {
    let data = queue.show()
  
    if (data) {
      res.send({ queue: data });
    } else {
      res.send({ queue: null })
    }
  })

  // Insere dados de teste
  app.get('/testData', (req, res) => {
    let min = 80
    let max = 86

    for(let i = 0; i < 500; i++) {
      let randomRSSI = (Math.floor(Math.random() * (max - min + 1)) + min) * -1
      queue.add(testBeacon = {
        id: 'D7:80:45:7D:C8:86', // beacon_amarelo
        rssi: randomRSSI
      })

      randomRSSI = (Math.floor(Math.random() * (max - min + 1)) + min) * -1
      queue.add(testBeacon = {
        id: 'F8:15:B1:06:9B:71', 
        rssi: randomRSSI
      })

      randomRSSI = (Math.floor(Math.random() * (max - min + 1)) + min) * -1
      queue.add(testBeacon = {
        id: 'CF:43:E0:FA:CE:D2', 
        rssi: randomRSSI
      })
    }

    res.send({ queue: queue.show() })
  })




}