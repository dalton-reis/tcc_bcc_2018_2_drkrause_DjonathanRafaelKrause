let kalmanFilter
let BEACONS = [], MAX_DIST = 0
let lemonBeacon, candyBeacon, beetrootBeacon
let receiver, beaconData, isEmptyQueueObj, img, nearest

// Setup do mapa
function setup() {
  //kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})
  createCanvas(500, 900) //createCanvas(480, 858)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)
  img = loadImage('sala_dalton.png') // sala 5m x 9m

  initBeacons()
  receiver = new Receiver()

  // Indicador de q tem ou nao dados para serem consumidos na fila
  isEmptyQueueObj = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0],
    isEmpty: true
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
  fill(isEmptyQueueObj.color)
  ellipse(isEmptyQueueObj.pos.x, isEmptyQueueObj.pos.y, 10)
  image(img, 0, 0)
  pop()

  getFromQueue()
  receiver.updateAndShow()
  updateBeacons()
}

/**
 * Desenha BEACONS e atualiza a distância
 */
function updateBeacons() {
	for(let beacon of BEACONS) {
    // Só atualiza a distância do beacon se houverem dados para consumir na fila
    if (!isEmptyQueueObj.isEmpty) {
      if (beacon.rssi > nearest.rssi) {
        nearest = beacon
      }
    }
    
    beacon.show()
  }
}

/**
 * Cria os BEACONS
 */
function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2, height * 0.1), LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width/2, height * 0.5), CANDY_COLOR, 'beacon_rosa', -77)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(width/2, height * 0.9), BEETROOT_COLOR, 'beacon_roxo', -80)

  BEACONS.push(lemonBeacon)
  BEACONS.push(candyBeacon)
  BEACONS.push(beetrootBeacon)

  nearest = beetrootBeacon
}