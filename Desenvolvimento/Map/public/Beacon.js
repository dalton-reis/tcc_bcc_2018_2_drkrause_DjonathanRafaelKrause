class Beacon {
  constructor (id, pos, r, color, name, txPower) {
    this.id = id
    this.pos = pos
    this.r = r
    this.color = color
    this.rssi = txPower // Começa com o txPower para não ser 0
    this.dist = 0 
    this.name = name
    this.txPower = txPower // RSSI médio a 1m
    this.motionAvgFilter = new MotionAvgFilter(50)

    // https://www.wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/
    this.kalmanFilter = new KalmanFilter({R: 0.01, Q: 3})

    this.normPos = createVector(normalize(this.pos.x), normalize(this.pos.y))
  }

  show () {
    push()
    noStroke()
    fill(beacon.color)
    ellipse(beacon.pos.x, beacon.pos.y, beacon.r * 10)
    pop();
  }

  setRSSI (newRSSI) {
    if (!isEmpty(newRSSI)) {
      this.motionAvgFilter.step(newRSSI)
      let avgFilter = round(this.motionAvgFilter.currentState()).toFixed(2)
      let kalman = kalmanFilter.filter(newRSSI).toFixed(2)

      this.rssi = avgFilter

      //console.log(this.name + "\t| RECEBIDO: " + newRSSI + " | KALMAN: " + this.rssi + " | MEDIA: " + avgFilter)
    }
  }
}