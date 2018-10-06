const SERVER = 'http://localhost:8081/'

// Busca informação da fila
function getFromQueue() {
  fetch(SERVER + 'get', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (data.beacons !== null) {
        transformData(data)
      } else {
        console.log("Sem mais dados para consumir da fila")
      }
    })
    .catch((err) => { 
      console.error(err); 
    });
}

// Seta as informações atualizadas dos beacons
function transformData(data) {
  // Seta beacon recebido de acordo com o id
  let brAmarelo = data.beacons.find((beacon) => { return beacon.id === 'beacon_amarelo' })
  let brRosa = data.beacons.find((beacon) => { return beacon.id === 'beacon_rosa' })
  let brRoxo = data.beacons.find((beacon) => { return beacon.id === 'beacon_roxo' })

  // Seta distância do beacon recebido na referência do mapa
  beaconAmarelo.setDist(brAmarelo.dist)
  beaconRosa.setDist(brRosa.dist)
  beaconRoxo.setDist(brRoxo.dist)
}

