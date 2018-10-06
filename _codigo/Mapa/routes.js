module.exports = function (app) {
  // Imports
  let Fila = require('./Fila.js')
  let fila = new Fila()

  // Rota para add beacons
  app.get('/add/:dados', (req, res) => {
    fila.add(req.params.dados)
    res.send({ msg: 'inserido' })
  })
  
  // Rota para pegar o primeiro dado da fila
  app.get('/get', (req, res) => {
    let dados = fila.get()
  
    if (dados) {
      res.send(dados);
    } else {
      res.send({ beacons: null })
    }
  })

  // Rota para limpar fila
  app.get('/reset', (req, res) => {
    fila.reset()
    res.send({ msg: 'resetada' })
  })
  
  // Rota para pegar todos os dados da fila (nao remove)
  app.get('/getAll', (req, res) => {
    let dados = fila.getAll()
  
    if (dados) {
      res.send({ fila: dados });
    } else {
      res.send({ fila: null })
    }
  })
  
  // Rota para inserir dados de teste na fila
  app.get('/test', (req, res) => {
    for (let i = 1; i < 100; i++) {
      let b = [
        {
          id: 'beacon_amarelo',
          dist: i * 3.4
        },
        {
          id: 'beacon_rosa',
          dist: i * 12.5
        },
        {
          id: 'beacon_roxo',
          dist: i * 2.7
        }
      ]
      fila.add({ beacons: b })
    }
    res.send(fila.getAll())
  })

  app.get('/testRealData', (req, res) => {
    fila.add({ beacons: [{ id: "beacon_amarelo", dist: -85 }, { id: "beacon_rosa", dist: -73 }, { id: "beacon_roxo", dist: -70 } ] })
    fila.add({ beacons: [{ id: "beacon_amarelo", dist: -67 }, { id: "beacon_rosa", dist: -77 }, { id: "beacon_roxo", dist: -73 } ] })
    fila.add({ beacons: [{ id: "beacon_amarelo", dist: -80 }, { id: "beacon_rosa", dist: -83 }, { id: "beacon_roxo", dist: -86 } ] })
    fila.add({ beacons: [{ id: "beacon_amarelo", dist: -91 }, { id: "beacon_rosa", dist: -92 }, { id: "beacon_roxo", dist: -90 } ] })
    fila.add({ beacons: [{ id: "beacon_amarelo", dist: -97 }, { id: "beacon_rosa", dist: -93 }, { id: "beacon_roxo", dist: -101 } ]})
    
    res.send(fila.getAll())
  })
  
}