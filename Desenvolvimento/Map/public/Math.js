
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
  let ra = beacon1.dist
  let rb = beacon2.dist
  let rc = beacon3.dist

  /*
  xa = map(xa, 50, width-50, 0, 100)
  ya = map(ya, 50, height-50, 0, 100)

  xb = map(xb, 50, width-50, 0, 100)
  yb = map(yb, 50, height-50, 0, 100)
  
  xc = map(xc, 50, width-50, 0, 100)
  yc = map(yc, 50, height-50, 0, 100)
  */

  // Faz a matemágica
  var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0
  var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0
  var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)))
  var x = ((y * (ya - yb)) - T) / (xb - xa)

  //x = map(x, 0, 100, 50, width-50)
  //y = map(y, 0, 100, 50, height-50)

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
 * 
 * @param {*} beacon 
 */
function calcDistRSSI(beacon) {
  if (beacon.name == 'beacon_amarelo') 
    console.log(beacon.rssi + ' | ' + beacon.minRSSI + ' | ' + beacon.maxRSSI)
  return map(beacon.rssi, beacon.minRSSI, beacon.maxRSSI, 0, 100).toFixed(2)
}

/**
 * Desenha distância entre p1 e p2
 * @param p1 vetor com xy do ponto
 * @param p2 vetor com xy do ponto
 * @param dist distância já calculada entre p1 e p2
 */
function drawDist(p1, p2, dist) {
  push()
  stroke(1)
  translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
  text(nfc(dist, 2) + '%', 0, -5)
  pop()
}

/**
 * Calcula a distância de acordo com o RSSI recebido
 * @param beacon deve ter os atributos RSSI e txPower
 * distance = A × (r / t)^B + C
 */
function calcDistRSSI_OLD(beacon) {
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
