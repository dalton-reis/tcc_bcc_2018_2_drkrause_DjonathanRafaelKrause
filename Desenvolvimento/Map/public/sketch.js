let kalmanFilter
let BEACONS = [], MAX_DIST = 0
let lemonBeacon, candyBeacon, beetrootBeacon
let receiver, beaconData, isEmptyQueueObj, greaterDistPx, img
let beaconsAreCalibrated = false, btnGetCalibration

// Setup do mapa
function setup() {
  //kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})
  createCanvas(500, 900) //createCanvas(480, 858)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)
  img = loadImage('S412.png') // sala 5m x 9m

  initBeacons()
  receiver = new Receiver()

  // Será a diagonal entre os dois beacons mais afastados
  MAX_DIST = round(calcDist(lemonBeacon.pos, beetrootBeacon.pos))
  console.log('MAX_DIST = ' + MAX_DIST)

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

  btnForceCalibration = createButton('Forçar Calibração')
  btnForceCalibration.position(width + 15, 40)
  btnForceCalibration.mousePressed(() => {
    lemonBeacon.maxRSSI = -52
    lemonBeacon.minRSSI = -101
    candyBeacon.maxRSSI = -47
    candyBeacon.minRSSI = -97
    beetrootBeacon.maxRSSI = -52
    beetrootBeacon.minRSSI = -99

    beaconsAreCalibrated = true
  })
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

  if (!beaconsAreCalibrated) {
    getCalibratedBeacons()
    text('Os beacons não estão calibrados', width/2, height/2)
  } else {
    getFromQueue()
    receiver.updateAndShow()
    updateBeacons()
  }
}

/**
 * Desenha BEACONS e atualiza a distância
 */
function updateBeacons() {
	for(let beacon of BEACONS) {
    // Só atualiza a distância do beacon se houverem dados para consumir na fila
    if (!isEmptyQueueObj.isEmpty) {
      if (beacon.name == 'beacon_amarelo') {
        console.log(d2(beacon) + ' metros')
      }
      
      beacon.dist = calcDistRSSI(beacon) // %
      //beacon.dist = calcDistMeters(beacon) // m
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
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(50, 50), LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width-50, 50), CANDY_COLOR, 'beacon_rosa', -77)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(width-50, height-50), BEETROOT_COLOR, 'beacon_roxo', -80)

  BEACONS.push(lemonBeacon)
  BEACONS.push(candyBeacon)
  BEACONS.push(beetrootBeacon)
}