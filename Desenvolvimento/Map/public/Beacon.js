class Beacon {
  constructor (id, pos, color, name, txPower) {
    this.id = id
    this.name = name
    this.txPower = txPower // RSSI médio a 1m
    this.rssi = txPower // Começa com o txPower para não ser 0
    this.rawRSSI = txPower
    this.maxRSSI = -1000
    this.minRSSI = 1000
    this.dist = 0 
    this.r = 3
    this.pos = pos
    this.color = color

    //this.motionAvgFilter = new MotionAvgFilter(50)
    // https://www.wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/
    //this.kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})
  }

  setMinMaxRSSI(min, max) {
    this.minRSSI = min
    this.maxRSSI = max
  }

  show () {
    push()
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.r * 10)
    pop()
  }
}