

export class MotionAvgFilter {

  window : number
  data : Array<number>

  constructor (window) {
    this.window = window
    this.data = []
  }

  step (measurement) {
    this.data.push(measurement)
    if (this.data.length > this.window) {
      this.data.shift()
    }
  }

  currentState () {
    let sum = this.data.reduce(function(a, b) { return a + b; })
    let avg = sum / this.data.length
    return avg
  }
}