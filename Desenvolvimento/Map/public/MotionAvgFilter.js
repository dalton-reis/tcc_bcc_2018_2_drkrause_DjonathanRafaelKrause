class MotionAvgFilter {
  constructor (window) {
    this.window = window
    this.data = []
  }

  step (measurement) {
    this.data.push(measurement)
    if (this.data.length > this.window) {
      this.data.pop()
    }
  }

  currentState () {
    return this.data.reduce((a,b) => a + b, 0) / this.data.length 
  }
}