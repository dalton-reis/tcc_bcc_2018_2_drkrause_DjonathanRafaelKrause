
// Busca informação da fila
function removeFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      //if (data !== null && data !== undefined && data != {}) {
      if (!isEmptyObject(data)) {
        return transformData(data)
      } else {
        console.log("Sem mais dados para consumir da fila")
      }
    })
    .catch((err) => { 
      console.error(err); 
    });
}

function transformData(data) {
  // Seta beacon recebido de acordo com o id
  let brAmarelo = {}, brRosa = {}, brRoxo = {}
  if (data.id === "D7:80:45:7D:C8:86") {
    brAmarelo = data
  } else if (data.id === 'F8:15:B1:06:9B:71') {
    brRosa = data
  } else if (data.id === 'CF:43:E0:FA:CE:D2') {
    brRoxo = data
  }

  brAmarelo.id = 'beacon_amarelo'
  brRosa.id = 'beacon_rosa'
  brRoxo.id = 'beacon_roxo'

  // Atualiza RSSI dos beacons
  lemonBeacon.setRSSI(brAmarelo.rssi)
  candyBeacon.setRSSI(brRosa.rssi)
  beetrootBeacon.setRSSI(brRoxo.rssi)
  
  // Seta distância do beacon recebido na referência do mapa
  lemonBeacon.dist = calcDistRSSI(lemonBeacon.rssi)
  candyBeacon.dist = calcDistRSSI(candyBeacon.rssi)
  beetrootBeacon.dist = calcDistRSSI(beetrootBeacon.rssi)

  console.log(lemonBeacon.dist)

}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}