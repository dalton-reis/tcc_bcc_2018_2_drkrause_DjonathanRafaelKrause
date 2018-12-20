
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

