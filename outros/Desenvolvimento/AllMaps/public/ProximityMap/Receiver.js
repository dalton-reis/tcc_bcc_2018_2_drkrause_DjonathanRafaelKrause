
class Receiver {
  constructor () {
    this.pos = createVector(width/2, height/2) // posicao inicial
    this.color = BLUE
    this.r = 25
    this.outsideR = this.r
    this.maxOutsideR = 150
  }

  show () {
    push()
    fill(this.color)
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.r)
    stroke(1)
    noFill()
    ellipse(this.pos.x, this.pos.y, this.outsideR)

    if (this.outsideR > this.maxOutsideR) {
      this.outsideR = this.r
    } else {
      this.outsideR *= 1.05
    }
    pop()
  }
  
  update () {
    this.pos = nearest.pos
  }

  updateAndShow () {
    if (!isEmptyQueueObj.isEmpty) {
      this.update()
    }
    
    this.show()
  }
}