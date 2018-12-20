let kalmanFilter
let BEACONS = [], MAX_DIST = 0
let lemonBeacon, candyBeacon, beetrootBeacon
let receiver, beaconData, isEmptyQueueObj, greaterDistPx, img
let beaconsAreCalibrated = false, btnGetCalibration

// Setup do mapa
function setup() {
  //kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})
  createCanvas(800, 600) //createCanvas(480, 858)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)

  initBeacons()
  receiver = new Receiver()

  // Indicador de q tem ou nao dados para serem consumidos na fila
  isEmptyQueueObj = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0],
    isEmpty: true
  }

  // Setupa botão pra resetar a calibração e forçar calibração
  btnGetCalibration = createButton('Resetar Calibração')
  btnGetCalibration.position(width + 15, 10)
  btnGetCalibration.mousePressed(() => { 
    beaconsAreCalibrated = false
  })
}

// Função que fica em loop atualizando a posição no mapa
function draw() {
  background(255)
  push()
  fill(255)
  stroke(50)
  strokeWeight(30)
  rect(0, 0, width, height)
  fill(255)
  strokeWeight(0)
  fill(isEmptyQueueObj.color)
  ellipse(isEmptyQueueObj.pos.x, isEmptyQueueObj.pos.y, 10)
  pop()

  if (!beaconsAreCalibrated) {
    getCalibratedBeacons()
    text('Os beacons não estão calibrados', width/2, height/2)
  } else {
    getFromQueue()
    updateBeacons()
    receiver.show()
  }
}

/**
 * Desenha BEACONS e atualiza a distância
 */
function updateBeacons() {
	for(let beacon of BEACONS) {
    // Só atualiza a distância do beacon se houverem dados para consumir na fila
    if (!isEmptyQueueObj.isEmpty) {
      let d = calcDistRSSI(beacon)
      
      if (d > 100) {
        d = 100
      } else if (d < 0) {
        d = 0
      }

      beacon.dist = d
      receiver.pos.y = map(beacon.dist, 0, 100, 50, height-50)
    }
    
    drawDist(receiver.pos, beacon.pos, beacon.dist)
    line(beacon.pos.x, beacon.pos.y, receiver.pos.x, receiver.pos.y)
    beacon.show()
  }
}

/**
 * Cria os BEACONS
 */
function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2, 50), LEMON_COLOR, 'beacon_amarelo', -78)
  BEACONS.push(lemonBeacon)
}