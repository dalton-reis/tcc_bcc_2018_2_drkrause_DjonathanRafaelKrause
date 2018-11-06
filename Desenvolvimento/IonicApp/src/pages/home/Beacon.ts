import { MotionAvgFilter } from './MotionAvgFilter'

export class Beacon {

  id : string
  name : string
  rssi : number
  maxRSSI : number
  minRSSI : number
  filteredRSSI : number
  txPower : number
  rssiFilter : MotionAvgFilter
  minFilter : MotionAvgFilter
  maxFilter : MotionAvgFilter

  constructor (id, name, txPower) {
    this.id = id
    this.name = name
    this.txPower = txPower
    this.rssi = 0
    this.maxRSSI = -1000
    this.minRSSI = 1000
    this.filteredRSSI = 0
    this.rssiFilter = new MotionAvgFilter(50)
    this.minFilter = new MotionAvgFilter(3)
    this.maxFilter = new MotionAvgFilter(3)
  }

  setRSSI(rssi) {
    this.rssi = rssi
    this.setFilteredRSSI(rssi)
    this.setMaxRSSI(rssi)
    this.setMinRSSI(rssi)
  }

  setFilteredRSSI(newRSSI) {
    this.rssiFilter.step(newRSSI)
    let filtered = this.rssiFilter.currentState()
    this.filteredRSSI = this.round(filtered)
  }

  setMaxRSSI(rssi) {
    if (rssi > this.maxRSSI) {
      this.maxFilter.step(rssi)
      let filtered = this.maxFilter.currentState()
      this.maxRSSI = this.round(filtered)
    }
  }

  setMinRSSI(rssi) {
    if (rssi < this.minRSSI) {
      this.minFilter.step(rssi)
      let filtered = this.minFilter.currentState()
      this.minRSSI = this.round(filtered)
    }
  }

  round(value) {
    return Math.round(value * 10) / 10 
  }
}