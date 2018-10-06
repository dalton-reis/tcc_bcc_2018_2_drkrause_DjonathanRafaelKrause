/**
 * Utiliza trilateração para encontrar a posição atual do receptor
 * Trilateração em JavaScript: https://gist.github.com/kdzwinel/8235348
 * Trilateração: https://en.wikipedia.org/wiki/Trilateration
 */
function getTrilateration(beacon1, beacon2, beacon3) {
  // Seta vars xy de a, b e c
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

  // Faz a mágica
  let S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
  let T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
  let y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
  let x = ((y * (ya - yb)) - T) / (xb - xa);

  // Retorna vetor com x e y calculados
  return createVector(round(x), round(y))
}

/**
 * Calcula distância entre dois pontos num espaço euclidiano 2D
 * A função dist() faz isso com p5.js
 * @param x1 - x do ponto 1
 * @param y1 - y do ponto 1
 * @param x2 - x do ponto 2
 * @param y2 - y do ponto 2
 * @returns Distância entre p1 e p2
 */
function calcDist(x1, y1, x2, y2) {
  let a = (x2 - x1) * (x2 - x1);
  let b = (y2 - y1) * (y2 - y1);
  return sqrt(a + b);
}

/**
 * Desenha distância entre p1 e p2
 */
function drawDist(p1, p2) {
  let d = calcDist(p1.x, p1.y, p2.x, p2.y);
  push();
  stroke(1);
  translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  rotate(atan2(p2.y - p1.y, p2.x - p1.x));
  text(nfc(d, 1), 0, -5);
  pop();
}
