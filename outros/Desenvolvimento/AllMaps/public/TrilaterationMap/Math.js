
/**
 * Utiliza trilateração para encontrar a posição atual do receptor
 * Trilateração em JavaScript: https://gist.github.com/kdzwinel/8235348
 * Trilateração: https://en.wikipedia.org/wiki/Trilateration
 * @param beacon - precisa ter um vetor com posição x, y fixa e um atributo dist 
 * com a distância entre o beacon e o recepetor
 * @return - vetor com posição x, y calculada
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

  // normaliza distancia, a maior distância sempre vai ser a diagonal
  ra = round(map(ra, 0, 100, 0, MAX_DIST))
  rb = round(map(rb, 0, 100, 0, MAX_DIST))
  rc = round(map(rc, 0, 100, 0, MAX_DIST))

  // Faz a matemágica
  var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0
  var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0
  var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)))
  var x = ((y * (ya - yb)) - T) / (xb - xa)

  // Retorna vetor com x e y calculados
  return createVector(round(x), round(y))
}

/**
 * Calcula o percentual de distância entre o beacon e o receptor
 * 100% será o mais longe possível, 0% o mais perto possível
 * @param {*} beacon com atributo rssi, minRSSI e maxRSSI
 */
function calcDistRSSI(beacon) {
  let percDist = map(beacon.rssi, beacon.minRSSI, beacon.maxRSSI, 100, 0).toFixed(2)
  
  if (percDist > 100) {
    percDist = 100
  } else if (percDist < 0) {
    percDist = 0
  }

  return percDist
}

/**
 * Calcula a distância em metros
 * @param {*} beacon 
 */
function calcDistMeters(beacon) {
  var txPower = beacon.txPower 
  var rssi = beacon.rssi  
  return Math.pow(10, (txPower - rssi) / 20)
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

