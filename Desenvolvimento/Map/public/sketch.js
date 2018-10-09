
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me

// Setup do mapa
function setup() {
  createCanvas(800, 600)
  frameRate(FRAME_RATE)

  lemonBeacon = new Beacon('beacon_amarelo', createVector(50, 50), 4, LEMON_COLOR)
  candyBeacon = new Beacon('beacon_rosa', createVector(750, 50), 4, CANDY_COLOR)
  beetrootBeacon = new Beacon('beacon_roxo', createVector(750, 550), 4, BEETROOT_COLOR)

  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
  beacons.push(beetrootBeacon);

  me = {
    pos: createVector(0, 0),
    color: BLUE
  }
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  background(255)
  
  // Pega distância dos beacons inserida no servidor e transforma nos dados necessários
  removeFromQueue()
  //noiseTest()

  // Calcula posição atual 
  me.pos = getTrilateration(lemonBeacon, candyBeacon, beetrootBeacon)

  // Desenha minha posição
  push();
  noStroke();
  fill(me.color);
  ellipse(me.pos.x, me.pos.y, 30);
  pop();

  // Desenha beacons
	for(beacon of beacons) {
    let p1 = me.pos;
    let p2 = beacon.pos;
    drawDist(p1, p2);
    line(beacon.pos.x, beacon.pos.y, me.pos.x, me.pos.y)
    beacon.show()
  }
}
