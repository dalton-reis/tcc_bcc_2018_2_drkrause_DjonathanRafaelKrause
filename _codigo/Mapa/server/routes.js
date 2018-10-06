module.exports = function (app) {
  let Fila = require('./Fila.js')
  let fila = new Fila()

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
        beacons: null
      })
    }
    
  })
  
  app.get('/empty', (req, res) => {
    let empty = fila.empty()
    res.send({
      beacons: empty
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
  
  app.get('/test', (req, res) => {
    for (let i = 1; i < 100; i++) {
      let b = [
        {
          id: 'b1',
          dist: i * 3.4
        },
        {
          id: 'b2',
          dist: i * 12.5
        },
        {
          id: 'b3',
          dist: i * 2.7
        }
      ]
      fila.add({ beacons: b })
    }
    res.send(fila.getAll())
  })
  
}