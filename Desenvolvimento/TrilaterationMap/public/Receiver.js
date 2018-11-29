
class Receiver {
  constructor () {
    this.pos = createVector(width/2, height/2) // posicao inicial
    this.color = BLUE
  }

  show () {
    push()
    fill(this.color)
    noStroke()
    ellipse(this.pos.x, this.pos.y, 25)
    pop()
  }
  
  update () {
    this.pos = getTrilateration(lemonBeacon, candyBeacon, beetrootBeacon)
  }

  updateAndShow () {
    if (!isEmptyQueueObj.isEmpty) {
      this.update()
    }
    
    this.show()
  }
}