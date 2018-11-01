
/**
 * Utiliza trilateração para encontrar a posição atual do receptor
 * Trilateração em JavaScript: https://gist.github.com/kdzwinel/8235348
 * Trilateração: https://en.wikipedia.org/wiki/Trilateration
 */
function getTrilateration(beacon1, beacon2, beacon3) {
  // Seta vars xy dos beacons a, b e c
  let xa = beacon1.pos.x
  let ya = beacon1.pos.y
  
  let xb = beacon2.pos.x
  let yb = beacon2.pos.y
  
  let xc = beacon3.pos.x
  let yc = beacon3.pos.y
  
  // Seta variáveis de distância, um objeto Beacon tem o atributo dist que deve ser atualizado 
  // Com a distância atual do receptor até o beacon
  let ra = 62//beacon1.dist
  let rb = 364//beacon2.dist
  let rc = 833//beacon3.dist

  // Faz a matemágica
  
  var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
  var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
  var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
  var x = ((y * (ya - yb)) - T) / (xb - xa);

  // Retorna vetor com x e y calculados
  return createVector(round(x), round(y))
}

/**
 * Calcula distância entre dois pontos num espaço euclidiano 2D
 * A função dist() faz isso com p5.js
 * @param p1 - vetor {x: n1, y: n2} com x e y do ponto 1
 * @param p2 - vetor {x: n1, y: n2} com x e y do ponto 2
 * @returns Distância entre p1 e p2
 */
function calcDist(p1, p2) {
  let a = (p2.x - p1.x) * (p2.x - p1.x)
  let b = (p2.y - p1.y) * (p2.y - p1.y)
  
  return sqrt(a + b)
}

/**
 * Calcula a distância de acordo com o RSSI recebido
 * @param beacon deve ter os atributos RSSI e txPower
 * distance = A × (r / t)^B + C
 */
function calcDistRSSI(beacon) {
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
function calcDistRSSI2(beacon) {
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
function calcDistRSSI3(beacon) {
  let d = 0
  let n = 1
  let A = beacon.txPower
  let rssi = beacon.rssi

  d = 10 * (A - rssi / 10*n)
  return d
}

/**
 * Normalização
 */
function normalize(value) {
  return map(value, 0, width, 0, MAX_REAL_WORLD_DIST)
}
 
/**
 * Desenha distância entre p1 e p2
 * @param p1 vetor com xy do ponto
 * @param p2 vetor com xy do ponto
 * @param dist distância já calculada entre p1 e p2
 */
function drawDist(p1, p2, dist) {
  push();
  stroke(1);
  translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  //rotate(atan2(p2.y - p1.y, p2.x - p1.x));
  text(nfc(dist, 2) + ' cm', 0, -5);
  pop();
}

