module.exports = function (app) {
  // Imports
  let Queue = require('./Queue.js')
  let queue = new Queue()
  let calibratedBeacons = []
  let reqCount = 0

  // add beacons na fila
  app.get('/add/:data', (req, res) => {
    queue.add(req.params.data)
    res.send({ msg: 'inserido' })
  })

  // add lista de beacons na fila
  app.post('/addAll', (req, res) => {
    if (req.body !== undefined && req.body !== null) {
      console.log("Inserindo na fila. reqCount: " + reqCount + ". Tamanho da fila: " + queue.size())
      reqCount++
      queue.addAll(req.body)
      res.send({ msg: 'dados inseridos' })
    } else {
      res.send({ msg: 'nenhum para inserir' })
    }
  })

  app.post('/calibrationComplete', (req, res) => {
    if (req.body !== undefined && req.body !== null) {
      let data = req.body
      calibratedBeacons = data
      console.log(data)
    } else {
      res.send({ msg: 'erro' })
    }
  })

  app.get('/getCalibratedBeacons', (req, res) => {
    let data = calibratedBeacons
    calibratedBeacons = []
    res.send(data)
  })

  app.get('/forceCalibration', (req, res) => {
    calibratedBeacons = [
      { id: 'D7:80:45:7D:C8:86',
        name: 'beacon_amarelo',
        txPower: -78,
        rssi: -90,
        maxRSSI: -50,
        minRSSI: -100,
      },
      { 
        id: 'F8:15:B1:06:9B:71',
        name: 'beacon_rosa',
        txPower: -77,
        rssi: -57,
        maxRSSI: -52,
        minRSSI: -103,
      } 
    ]

    res.send({ msg: 'ok' })
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

  // Mostra todos os dados da queue (nao remove)
  app.get('/show', (req, res) => {
    let data = queue.show()
  
    if (data) {
      res.send({ queue: data });
    } else {
      res.send({ queue: null })
    }
  })

  

}