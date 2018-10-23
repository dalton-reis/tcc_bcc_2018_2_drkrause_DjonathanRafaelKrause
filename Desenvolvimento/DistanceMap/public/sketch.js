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

  initBeacons()

  kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

  // Indica se tem ou nao dados para serem consumidos na fila
  noMoreDataSign = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0]
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
  //text('LCI', lemonBeacon.pos.x * 1.15, lemonBeacon.pos.y + 8)
  //text('S-412', candyBeacon.pos.x * 1.17, candyBeacon.pos.y + 8)
  //text('Robótica', beetrootBeacon.pos.x * 1.22, beetrootBeacon.pos.y + 8)
  pop()
  
  getFromQueue()
  updateBeacons()
}

/**
 * Desenha beacons e atualiza a distância
 */
function updateBeacons() {
	for(beacon of beacons) {

    d = calcDistRSSI(beacon) //* 100  // em cm
    beacon.dist = d
    
    
    push();
    fill(255)
    let proximity = calcProximity(d)
    let r = map(d, 0, 15, 40, 600)
    console.log(proximity + ' - ' + d + ' metros')
    ellipse(beacon.pos.x, beacon.pos.y, r)
    beacon.show()
    pop();
  }
}

function calcProximity(distance) {
  if (distance < 100) {
    return "NEAR"
  } else if (distance > 200) {
    return "FAR"
  }
}

/**
 * Cria os beacons
 */
function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(width/2, height/2), 4, LEMON_COLOR, 'beacon_amarelo', -78)
  //candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width/2, height/2), 4, CANDY_COLOR, 'beacon_rosa', -77)
  //beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(width/2, 550), 4, BEETROOT_COLOR, 'beacon_roxo', -80)

  beacons.push(lemonBeacon);
  //beacons.push(candyBeacon);
  //beacons.push(beetrootBeacon);
}