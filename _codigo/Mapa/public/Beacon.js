class Beacon {
  constructor (id, pos, r, cor) {
    this.id = id
    this.pos = pos
    this.r = r
    this.cor = cor
    this.dist = 0
  }

  show () {
    push()
    noStroke()
    fill(beacon.cor)
    ellipse(beacon.pos.x, beacon.pos.y, beacon.r * 10)
    pop();
  }

  setDist (newDist) {
    if (newDist === null || newDist === undefined) {
      this.dist = this.dist
    } else {
      this.dist = newDist
    }
  }
}