
// Busca dados da fila
function getFromQueue() {
  fetch(SERVER + 'remove', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (!isEmptyObject(data)) {
        isEmptyQueue.color = [255]
        isEmptyQueue.isEmpty = false
        return setValues(data)
      } else {
        //console.log("Sem mais dados para consumir da fila")
        isEmptyQueue.color = [255,0,0]
        isEmptyQueue.isEmpty = true
        return
      }
    })
    .catch((err) => { 
      console.error(err); 
    });
}

// Seta beacon recebido de acordo com o id
function setValues(receivedBeacon) {
  for (let i = 0; i < beacons.length; i++) {
    if (beacons[i].id == receivedBeacon.id) {
      beacons[i].rssi = receivedBeacon.filteredRSSI
      beacons[i].maxRSSI = receivedBeacon.maxRSSI
      beacons[i].minRSSI = receivedBeacon.minRSSI
    } 
  }
}

function getCalibratedBeacons() {
  fetch(SERVER + 'getCalibratedBeacons', { method: 'GET', headers:{ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Methods':'POST, GET' } }) 
    .then((res) => res.json()) 
    .then((data) => {
      if (!isEmptyObject(data)) {
        setCalibratedBeacons(data)
        beaconsAreCalibrated = true
        return
      } else {
        beaconsAreCalibrated = false
        return 
      }
    })
    .catch((err) => { 
      console.error(err); 
    });
}

function setCalibratedBeacons(calibratedBeacons) {
  // Loop pelos beacons recebigos no GET
  for (let i = 0; i < calibratedBeacons.length; i++) {
    // Loop pelos beacons declarados no sketch
    for (let i = 0; i < beacons.length; i++) {
      if (beacons[i].id == calibratedBeacons[i].id) {
        beacons[i].maxRSSI = calibratedBeacons[i].maxRSSI
        beacons[i].minRSSI = calibratedBeacons[i].minRSSI
      } 
    }
  }
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

function isEmpty(value) {
  return value === null || value === undefined
}