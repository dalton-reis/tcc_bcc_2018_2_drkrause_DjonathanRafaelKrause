
// Busca dados da fila
function getFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (!isEmptyObject(data)) {
        isEmptyQueueObj.color = [255]
        isEmptyQueueObj.isEmpty = false
        return setValues(data)
      } else {
        //console.log("Sem mais dados para consumir da fila")
        isEmptyQueueObj.color = [255,0,0]
        isEmptyQueueObj.isEmpty = true
        return
      }
    })
    .catch((err) => { 
      console.error(err)
    })
}

// Seta beacon recebido de acordo com o id
function setValues(receivedBeacon) {
  for (let i = 0; i < BEACONS.length; i++) {
    if (BEACONS[i].id == receivedBeacon.id) {
      BEACONS[i].rawRSSI = receivedBeacon.rssi
      BEACONS[i].rssi = receivedBeacon.filteredRSSI
      BEACONS[i].maxRSSI = receivedBeacon.maxRSSI
      BEACONS[i].minRSSI = receivedBeacon.minRSSI
    } 
  }
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

/*function isEmpty(value) {
  return value === null || value === undefined
}*/