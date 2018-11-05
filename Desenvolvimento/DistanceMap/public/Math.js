
function calcDistRSSI(beacon) {
  let rssi = beacon.rssi
  let max = beacon.maxRSSI
  let min = beacon.minRSSI

  //console.log("RSSI: " + rssi + ' | max: ' + max + ' | min: ' + min)

  return map(rssi, min, max, 0, 100).toFixed(2)
}





// Parametros antigos android beacon library
function dist1(beacon) {
  let ratio = beacon.rssi*1.0 / beacon.txPower
  let dist = 0

  if (beacon.rssi == 0) {
    return -1.0
  }

  if (ratio < 1.0) {
    dist = Math.pow(ratio, 10)
  } else {
    dist = (0.89976) * Math.pow(ratio, 7.7095) + 0.111
  }

  return dist
}

// Novo modelo android beacon library
function dist2(beacon) {
  let dist = 0
  let rssi = beacon.rssi
  let rssiTX = beacon.txPower

  if (rssi == 0) {
    return -1
  }
  
  let A = 0.42093
  let B = 6.9476
  let C = 0.54992
  let ratio = rssi / rssiTX
  dist = A * Math.pow(ratio, B) + C

  return dist
}

// https://www.ijcaonline.org/research/volume137/number13/jayakody-2016-ijca-909028.pdf
// d = 10 * (A - RSSI / 10*n)
// A = txpower
// n = path loss, testar
function dist3(beacon) {
  let d = 0
  let n = 1
  let p0 = 1
  let X = 0
  let rssi = beacon.rssi

  //d = p0 - 10 * n (Math.log(rssi/d0)) + X
  return d
}