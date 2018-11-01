let kalmanFilter
let beacons = []
let lemonBeacon, candyBeacon, beetrootBeacon
let me, beaconData, emptyQueueFlag, greaterDistPx, img

// Setup do mapa
function setup() {
  // density = displayDensity()
  //pixelDensity(1)
  //createCanvas(480, 858)
  createCanvas(500, 900)
  frameRate(FRAME_RATE)
  textSize(20)
  textAlign(CENTER)

  img = loadImage('sala_dalton2.png') // sala 5m x 9m

  initBeacons()

  let p1 = lemonBeacon.pos
  let p2 = beetrootBeacon.pos
  greaterDistPx = dist(p1.x, p1.y, p2.x, p2.y)
  

  kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

  me = {
    pos: createVector(width/2, height/2), // posicao inicial
    color: BLUE
  }

  // Indica se tem ou nao dados para serem consumidos na fila
  emptyQueueFlag = {
    pos: createVector(width- 15, 15),
    color: [255, 0, 0],
    isEmpty: true
  }
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
  //text('xm', width/2, 30)
  fill(emptyQueueFlag.color)
  ellipse(emptyQueueFlag.pos.x, emptyQueueFlag.pos.y, 10)
  image(img, 0, 0)
  pop()

  getFromQueue()
  updateBeacons()

  // Calcula posição atual depois de obter as distâncias 
  me.pos = getTrilateration(lemonBeacon, candyBeacon, beetrootBeacon)
}

/**
 * Desenha beacons e atualiza a distância
 */
function updateBeacons() {
	for(beacon of beacons) {
    let p1 = me.pos
    let p2 = beacon.pos

    let d = calcDistRSSI(beacon) * 100  // * 100 pra ficar em cm
    let d2 = calcDistRSSI2(beacon) * 100  // * 100 pra ficar em cm
    beacon.dist = d2

    // posição dos beacons em pixels (50, 50...)
    // distância entre receptor e beacons em centímetros
    // ao calcular a posição atual com base na distância da ruim pq a
    // posição atual dos beacons está em pixels e a distância entre eles está em centímetros
    //console.log(beacon.name + ' - ' + d + ' | ' + d2)

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
 * Cria os beacons
 */
function initBeacons() {
  lemonBeacon = new Beacon('D7:80:45:7D:C8:86', createVector(50, 50), 2, LEMON_COLOR, 'beacon_amarelo', -78)
  candyBeacon = new Beacon('F8:15:B1:06:9B:71', createVector(width-50, 50), 2, CANDY_COLOR, 'beacon_rosa', -77)
  beetrootBeacon = new Beacon('CF:43:E0:FA:CE:D2', createVector(width-50, height-50), 2, BEETROOT_COLOR, 'beacon_roxo', -80)

  beacons.push(lemonBeacon);
  beacons.push(candyBeacon);
  beacons.push(beetrootBeacon);
}