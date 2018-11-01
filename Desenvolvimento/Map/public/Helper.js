
// Busca dados da fila
function getFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (!isEmptyObject(data)) {
        emptyQueueFlag.color = [255]
        emptyQueueFlag.isEmpty = false
        return setValues(data)
      } else {
        //console.log("Sem mais dados para consumir da fila")
        emptyQueueFlag.color = [255,0,0]
        emptyQueueFlag.isEmpty = true
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
    console.log('amarelo ' + beaconData.rssi)
    lemonBeacon.setRSSI(beaconData.rssi)
  } else if (beaconData.id === ADDR_CANDY_BEACON) {
    console.log('rosa ' + beaconData.rssi)
    candyBeacon.setRSSI(beaconData.rssi)
  } else if (beaconData.id === ADDR_BEETROOT_BEACON) {
    console.log('roxo ' + beaconData.rssi)
    beetrootBeacon.setRSSI(beaconData.rssi)
  }

}

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

function isEmpty(value) {
  return value === null || value === undefined
}