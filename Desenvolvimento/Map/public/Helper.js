
// Busca informação da fila
function removeFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (data.beacons !== null) {
        return transformData(data)
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

  /* Normaliza os dados : zi = xi - min(x) / max(x) - min(x)
  brAmarelo.dist = ((brAmarelo.dist - 0) / (width - 0)) * 100
  brRosa.dist = ((brRosa.dist - 0) / (width - 0)) * 100
  brRoxo.dist = ((brRoxo.dist - 0) / (width - 0)) * 100
  console.log(brAmarelo.dist + " - " + brRosa.dist + " - " + brRoxo.dist)*/

  // Seta distância do beacon recebido na referência do mapa
  lemonBeacon.setDist(brAmarelo.dist)
  candyBeacon.setDist(brRosa.dist)
  beetrootBeacon.setDist(brRoxo.dist)
}

// Teste de visualização com perlin noise
let xoff = 0.0
function noiseTest() {
  xoff = xoff + 0.01
  lemonBeacon.dist = noise(xoff) * 400
  candyBeacon.dist = noise(xoff) * 600
  beetrootBeacon.dist = noise(xoff) * 800
}

