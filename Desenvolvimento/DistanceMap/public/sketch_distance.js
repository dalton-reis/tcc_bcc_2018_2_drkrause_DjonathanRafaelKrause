let kalmanFilter
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me, beaconData, isEmptyQueue

// Setup do mapa
function setup() {
  createCanvas(600, 600)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)
  initBeacons()

  kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

  // Indica se tem ou nao dados para serem consumidos na fila
  isEmptyQueue = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0]
  }

  me = {
    pos: createVector(width/2, height-100), 
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
  fill(isEmptyQueue.color)
  ellipse(isEmptyQueue.pos.x, isEmptyQueue.pos.y, 10)
  fill(0)
  pop()
  
  getFromQueue()

  for(beacon of beacons) {
    let d1 = dist1(beacon)
    let d2 = dist2(beacon)
    let d3 = dist3(beacon)

    push();
    fill(255)
    beacon.show()
    stroke(1)
    fill(me.color)
    noStroke()
    ellipse(me.pos.x, me.pos.y, 25)
    fill(1)

    text('RSSI: ' + beacon.rssi, beacon.pos.x, beacon.pos.y+40)
    text(nfc(d1, 2) + '', beacon.pos.x, beacon.pos.y+60)
    text(nfc(d2, 2) + '', beacon.pos.x, beacon.pos.y+80)
    text(nfc(d3, 2) + '', beacon.pos.x, beacon.pos.y+100)

    pop();
  }
}

function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2-200, 100), 4, LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width/2, 100), 4, CANDY_COLOR, 'beacon_rosa', -77)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(width/2+200, 100), 4, BEETROOT_COLOR, 'beacon_roxo', -80)

  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
  beacons.push(beetrootBeacon);
}

