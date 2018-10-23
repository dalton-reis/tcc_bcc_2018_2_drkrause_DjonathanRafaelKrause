
// Busca dados da fila
function getFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (!isEmptyObject(data)) {
        noMoreDataSign.color = [255]
        return setValues(data)
      } else {
        //console.log("Sem mais dados para consumir da fila")
        noMoreDataSign.color = [255,0,0]
        return
      }
    })
    .catch((err) => { 
      console.error(err); 
    });
}

// Seta beacon recebido de acordo com o id
function setValues(beaconData) {
  if (beaconData.id === ADDR_LEMON_BEACON) {
    lemonBeacon.setRSSI(beaconData.rssi)
  } /*else if (beaconData.id === ADDR_CANDY_BEACON) {
    candyBeacon.setRSSI(beaconData.rssi)
  } else if (beaconData.id === ADDR_BEETROOT_BEACON) {
    beetrootBeacon.setRSSI(beaconData.rssi)
  }*/

}

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

function isEmpty(value) {
  return value === null || value === undefined
}