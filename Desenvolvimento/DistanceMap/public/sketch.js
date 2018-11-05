let kalmanFilter
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me, beaconData, isEmptyQueue, beaconsAreCalibrated = false
let maxDist, btnGetCalibration

// Setup do mapa
function setup() {
  createCanvas(600, 600)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)
  initBeacons()

  btnGetCalibration = createButton('Resetar Calibração')
  btnGetCalibration.position(width + 15, 10)
  btnGetCalibration.mousePressed(() => { 
    beaconsAreCalibrated = false
  })

  kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

  // Indica se tem ou nao dados para serem consumidos na fila
  isEmptyQueue = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0],
    isEmpty: true
  }

  me = {
    pos: createVector(width/2, height/2), 
    color: BLUE,
    nearer: lemonBeacon 
  }

  maxDist = candyBeacon.pos.y - lemonBeacon.pos.y

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
  
  if (!beaconsAreCalibrated) {
    getCalibratedBeacons()
    text('Os beacons não estão calibrados', width/2, height/2)
  } else {
    getFromQueue()

    push()
    fill(me.color)
    noStroke()
    ellipse(me.pos.x, me.pos.y, 25)
    pop()

    for(beacon of beacons) {
      if (!isEmptyQueue.isEmpty) {
        let d = calcDistRSSI(beacon)
        beacon.dist = d
        me.pos.y = map(d, 0, 100, lemonBeacon.pos.y, candyBeacon.pos.y)
      }

      if (beacon.name == 'beacon_rosa') {
        console.log('Min: ' + beacon.minRSSI +  ' | Max: ' + beacon.maxRSSI)
      }


      push()
      fill(255)
      beacon.show()
      stroke(1)
      fill(1)
      text(beacon.dist + '% |' + beacon.rssi, beacon.pos.x, beacon.pos.y+40)
      pop()
    }
  }
}

function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2, 100), 4, LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width/2, height-100), 4, CANDY_COLOR, 'beacon_rosa', -77)

  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
}
