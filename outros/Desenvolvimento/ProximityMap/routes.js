module.exports = function (app) {
  // Imports
  let Queue = require('./Queue.js')
  let queue = new Queue()
  let reqCount = 0
  let calibratedBeacons = []

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
      res.send({ msg: 'erro ao concluir calibração' })
    }
  })

  app.get('/getCalibratedBeacons', (req, res) => {
    res.send(calibratedBeacons)
    calibratedBeacons = []
  })

  app.get('/force', (req, res) => {
    calibratedBeacons = [ { id: 'D7:80:45:7D:C8:86',
    name: 'beacon_amarelo',
    txPower: -78,
    rssi: -89,
    maxRSSI: -60.4,
    minRSSI: -101,
    filteredRSSI: -81,
    rssiFilter: { window: 50, data: [Object] },
    maxFilter: { window: 3, data: [Object] } },
  { id: 'F8:15:B1:06:9B:71',
    name: 'beacon_rosa',
    txPower: -77,
    rssi: -93,
    maxRSSI: -67.43333333333334,
    minRSSI: -97,
    filteredRSSI: -92.5,
    rssiFilter: { window: 50, data: [Object] },
    maxFilter: { window: 3, data: [Object] } },
  { id: 'CF:43:E0:FA:CE:D2',
    name: 'beacon_roxo',
    txPower: -80,
    rssi: -100,
    maxRSSI: -52.13333333333333,
    minRSSI: -99,
    filteredRSSI: -96.2,
    rssiFilter: { window: 50, data: [Object] },
    maxFilter: { window: 3, data: [Object] } },
  { id: 'MIBEACON',
    name: 'mi_beacon',
    txPower: 0,
    rssi: 0,
    maxRSSI: -1000,
    minRSSI: 1000,
    filteredRSSI: 0,
    rssiFilter: { window: 50, data: [] },
    maxFilter: { window: 3, data: [] } },
  { id: 'GEN1',
    name: 'gen_beacon_1',
    txPower: 0,
    rssi: 0,
    maxRSSI: -1000,
    minRSSI: 1000,
    filteredRSSI: 0,
    rssiFilter: { window: 50, data: [] },
    maxFilter: { window: 3, data: [] } },
  { id: 'GEN2',
    name: 'gen_beacon_2',
    txPower: 0,
    rssi: 0,
    maxRSSI: -1000,
    minRSSI: 1000,
    filteredRSSI: 0,
    rssiFilter: { window: 50, data: [] },
    maxFilter: { window: 3, data: [] } } ]
    res.send(calibratedBeacons)
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

  // Simula o recebimento de dados
  app.get('/simulate', (req, res) => {
    let simulationInterval = setInterval(simulate, 100)
    res.send({ msg: 'Simulando' })
  })

  app.get('/stop', (req, res) => {
    clearInterval(simulationInterval);
    res.send({ msg: 'Parando simulação' })
  })  

  function simulate() {
    let min = 83
    let max = 102
    let randomRSSI = (Math.floor(Math.random() * (max - min + 1)) + min) * -1
    queue.add(testBeacon = {
      id: 'D7:80:45:7D:C8:86',
      rssi: randomRSSI
    })

    
    queue.add(testBeacon = {
      id: 'F8:15:B1:06:9B:71', 
      rssi: randomRSSI
    })

    
    queue.add(testBeacon = {
      id: 'CF:43:E0:FA:CE:D2', 
      rssi: randomRSSI
    })
  }

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