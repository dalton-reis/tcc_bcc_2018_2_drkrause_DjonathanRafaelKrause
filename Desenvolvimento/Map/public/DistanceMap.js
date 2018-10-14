/*
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me

// Setup do mapa
function setup() {
  createCanvas(600, 600)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)

  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2, 50), 4, LEMON_COLOR, 'beacon_amarelo')
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(550, 50), 4, CANDY_COLOR, 'beacon_rosa')
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(550, 550), 4, BEETROOT_COLOR, 'beacon_roxo')

  beacons.push(lemonBeacon);

  me = {
    pos: createVector(0, 0),
    color: BLUE
  }
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  background(255)
  push()
  
  fill(255)
  stroke(50)
  rect(50, 50, width-100, height-100)
  strokeWeight(100)
  rect(0, 0, width, height)
  fill(255)
  strokeWeight(0)
  text('3m', width/2, 30)
  pop()
  
  // Pega distância dos beacons inserida no servidor e transforma nos dados necessários
  removeFromQueue()

  me.pos = createVector(width/2, height/2)

  // Desenha minha posição
  push();
  noStroke();
  fill(me.color);
  ellipse(me.pos.x, me.pos.y, 30);
  pop();

  // Desenha beacons
	for(beacon of beacons) {
    drawDist(beacon.pos, me.pos, beacon.rssi)
    lineSize = calcDistRSSI(beacon.rssi)
    line(beacon.pos.x, beacon.pos.y, me.pos.x, me.pos.y)
    beacon.show()
  }
}
*/