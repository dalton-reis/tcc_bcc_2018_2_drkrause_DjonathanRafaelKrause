const FRAME_RATE = 1

const AMARELO = [255, 250, 0]
const ROSA = [255, 71, 239]
const ROXO = [109, 3, 100]
const AZUL = [35, 97, 255]

let beacons = []
let beaconAmarelo, beaconRosa, beaconRoxo
let eu

// Setup do mapa
function setup() {
  createCanvas(800, 600)
  frameRate(FRAME_RATE)

  beaconAmarelo = new Beacon('beacon_amarelo', createVector(50, 50), 4, AMARELO)
  beaconRosa = new Beacon('beacon_rosa', createVector(750, 50), 4, ROSA)
  beaconRoxo = new Beacon('beacon_roxo', createVector(750, 550), 4, ROXO)

  beacons.push(beaconAmarelo);
  beacons.push(beaconRosa);
  beacons.push(beaconRoxo);

  eu = {
    pos: createVector(0, 0),
    cor: AZUL
  }
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  background(255);
  
  // Pega distância dos beacons inserida no servidor
  getFromQueue()

  // Calcula posição atual 
  eu.pos = getTrilateration(beaconAmarelo, beaconRosa, beaconRoxo)

  // Desenha minha posição
  push();
  noStroke();
  fill(eu.cor);
  ellipse(eu.pos.x, eu.pos.y, 30);
  pop();

  // Desenha beacons
	for(beacon of beacons) {
    let p1 = eu.pos;
    let p2 = beacon.pos;
    drawDist(p1, p2);
    line(beacon.pos.x, beacon.pos.y, eu.pos.x, eu.pos.y)
    beacon.show()
  }
}
