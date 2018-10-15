
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me, beaconData

// Setup do mapa
function setup() {
  createCanvas(600, 600)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)

  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(50, 50), 4, LEMON_COLOR, 'beacon_amarelo', -79.636)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(550, 50), 4, CANDY_COLOR, 'beacon_rosa', -88.741)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(550, 550), 4, BEETROOT_COLOR, 'beacon_roxo', -83.657)


  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
  beacons.push(beetrootBeacon);

  me = {
    pos: createVector(width/2, height/2), // posicao inicial
    color: BLUE
  }

  kalman()
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  // Limpa o canvas e desenha as bordas
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
  
  // Pega os RSSIs dos beacons inserida na fila e seta nos beacons do mapa
  getFromQueue()

  updateBeacons()

  updateMe()
}

/**
 * Desenha beacons e atualiza a distância
 */
function updateBeacons() {
	for(beacon of beacons) {
    let p1 = me.pos
    let p2 = beacon.pos
    beacon.dist = calcDistRSSI(beacon) * 100

    drawDist(p1, p2, beacon.dist)
    line(beacon.pos.x, beacon.pos.y, me.pos.x, me.pos.y)
    beacon.show()
    
    // Desenha a minha posição aqui pra não dar delay com o desenho da linha 
    push();
    noStroke();
    fill(me.color);
    ellipse(me.pos.x, me.pos.y, 30);
    pop();
  }
}

/**
 * Calcula e desenha posição atual 
 */
function updateMe() {
  me.pos = getTrilateration(lemonBeacon, candyBeacon, beetrootBeacon)
}