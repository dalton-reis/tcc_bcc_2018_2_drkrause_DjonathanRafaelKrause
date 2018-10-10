class Beacon {
  constructor (id, pos, r, color, name) {
    this.id = id
    this.pos = pos
    this.r = r
    this.color = color
    this.rssi = 0
    this.dist = 0 // em centímetros 
    this.name = name
  }

  show () {
    push()
    noStroke()
    fill(beacon.color)
    ellipse(beacon.pos.x, beacon.pos.y, beacon.r * 10)
    pop();
  }

  setRSSI (newRSSI) {
    if (newRSSI !== null && newRSSI !== undefined) {
      this.rssi = newRSSI
    }
  }
}