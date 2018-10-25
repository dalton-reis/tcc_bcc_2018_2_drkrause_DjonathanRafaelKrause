let kalmanFilter
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me, beaconData, noMoreDataSign

// Setup do mapa
function setup() {
  createCanvas(600, 600)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)
  img = loadImage('map.png')

  initBeacons()

  kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

  // Indica se tem ou nao dados para serem consumidos na fila
  noMoreDataSign = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0]
  }

  me = {
    pos: lemonBeacon.pos, // posicao inicial
    color: BLUE,
    nearer: lemonBeacon 
  }
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  // Limpa o canvas e desenha as bordas
  background(255)
  push()
  stroke(50)
  strokeWeight(10)
  rect(0, 0, width, height)
  fill(255)
  strokeWeight(0)
  fill(noMoreDataSign.color)
  ellipse(noMoreDataSign.pos.x, noMoreDataSign.pos.y, 10)
  fill(0)
  image(img, 0, 0)
  text('LCI', 575, 65)
  //text('S-412', candyBeacon.pos.x * 1.17, candyBeacon.pos.y + 8)
  //text('Robótica', beetrootBeacon.pos.x * 1.22, beetrootBeacon.pos.y + 8)
  pop()
  
  getFromQueue()

  for(beacon of beacons) {
    d = calcDistRSSI(beacon) // em metros
    beacon.dist = d

    // Atualiza o beacon mais próximo do receptor
    if (d < me.nearer.dist) {
      me.nearer = beacon
      me.pos = beacon.pos
      console.log(d + ' metros')
    }
    
    push();
    fill(255)
    beacon.show()
    fill(me.color)
    noStroke()
    ellipse(me.pos.x, me.pos.y, 25)
    pop();
  }
}


/**
 * Cria os beacons
 */
function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(465, 65), 4, LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(470, 330), 4, CANDY_COLOR, 'beacon_rosa', -77)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(120, 540), 4, BEETROOT_COLOR, 'beacon_roxo', -80)

  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
  beacons.push(beetrootBeacon);
}