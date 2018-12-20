/**
 * Trilateration example using p5js.org
 * Trilateration math by https://gist.github.com/kdzwinel/8235348
 * Example by Djonathan Krause, 2018
 */

const AMARELO = [255, 250, 0]
const ROSA = [255, 71, 239]
const ROXO = [109, 3, 100]
const AZUL = [35, 97, 255]

let beacons = [], MAX_DIST
let b1, b2, b3

/**
 * Setup program
 */
function setup() {
  createCanvas(900, 500)
  textSize(20)

  // Create beacons
  b1 = new Beacon('b1', createVector(50, 50), 4, AMARELO)
  b2 = new Beacon('b2', createVector(width-50, 50), 4, ROSA)
  b3 = new Beacon('b3', createVector(width-50, height-50), 4, ROXO)

  MAX_DIST = calcDist(b1.pos.x, b1.pos.y, b3.pos.x, b3.pos.y)
  console.log(MAX_DIST)

  beacons.push(b1)
  beacons.push(b2)
  beacons.push(b3)
}

/**
 * This will loop for ever
 */
function draw() {
  background(255)
  
  let pos = getTrilateration(b1, b2, b3)

  // Draw mouse position
  push()
  fill(255)
  stroke(50)
  strokeWeight(10)
  rect(0, 0, width, height)
  pop()
  push()
  noStroke()
  fill(AZUL)
  ellipse(pos.x, pos.y, 30)
  stroke(1)
  fill(0)
  let text1 = 'Calc: ' + pos.x + ', ' + pos.y
  let text2 = 'Real: ' +round(mouseX) + ', ' + round(mouseY)
  text(nfc(text1), pos.x + 15, pos.y - 5)
  text(nfc(text2), pos.x + 15, pos.y + 15)
  pop()

  // Draw beacons
	for(beacon of beacons) {
    beacon.dist = calcDist(beacon.pos.x, beacon.pos.y, mouseX, mouseY)

    showDist(pos, beacon.pos, beacon.dist)
    line(beacon.pos.x, beacon.pos.y, pos.x, pos.y)
    beacon.show()
  }
}

/**
 * Do some math stuff to get trilateration.
 * Copied from https://gist.github.com/kdzwinel/8235348
 */
function getTrilateration(position1, position2, position3) {
  var xa = position1.pos.x
  var ya = position1.pos.y
  
  var xb = position2.pos.x
  var yb = position2.pos.y
  
  var xc = position3.pos.x
  var yc = position3.pos.y
  
  var ra = position1.dist
  var rb = position2.dist
  var rc = position3.dist

  var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
  var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
  var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
  var x = ((y * (ya - yb)) - T) / (xb - xa);

  return createVector(round(x), round(y))
}

/**
 * Calculate distance between two points. 
 * Function dist() in p5.js does the same thing.
 * @param x1 - x of point 1
 * @param y1 - y of point 1
 * @param x2 - x of point 2
 * @param y2 - y of point 2
 * @returns Distance between point 1 and 2
 */
function calcDist(x1, y1, x2, y2) {
  let a = (x2 - x1) * (x2 - x1);
  let b = (y2 - y1) * (y2 - y1);
  return sqrt(a + b);
}

/**
 * Do some magic stuff to print distance on the lines
 */
function showDist(p1, p2, d) {
  //let d = calcDist(p1.x, p1.y, p2.x, p2.y)
  push()
  stroke(1)
  translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
  text(nfc(d, 1), 0, -5)
  pop()
}
