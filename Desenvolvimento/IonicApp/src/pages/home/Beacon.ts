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
  maxFilter : MotionAvgFilter
  
  constructor (id, name, txPower, filterWindow) {
    this.id = id
    this.name = name
    this.txPower = txPower
    this.rssi = 0
    this.maxRSSI = -1000
    this.minRSSI = 1000
    this.filteredRSSI = 0
    this.rssiFilter = new MotionAvgFilter(filterWindow)
    this.maxFilter = new MotionAvgFilter(3)
  }

  setRSSI(rssi) {
    this.rssi = rssi
    this.setFilteredRSSI(rssi)
  }

  setFilteredRSSI(newRSSI) {
    this.rssiFilter.step(newRSSI)
    let filtered = this.rssiFilter.currentState()
    this.filteredRSSI = this.round(filtered)
  }

  setMaxRSSI(rssi) {
    this.maxFilter.step(rssi)
    let maxAvg = this.maxFilter.currentState()
    if (maxAvg > this.maxRSSI) {
      this.maxRSSI = maxAvg
    }
  }

  setMinRSSI(rssi) {
    if (rssi < this.minRSSI) {
      this.minRSSI = rssi
    }
  }

  round(value) {
    return Math.round(value * 10) / 10 
  }
}