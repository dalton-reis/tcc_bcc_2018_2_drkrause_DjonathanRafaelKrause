import { MotionAvgFilter } from './MotionAvgFilter'

export class Beacon {

  id : string
  name : string
  rssi : number
  maxRSSI : number
  minRSSI : number
  filteredRSSI : number
  txPower : number
  filter : MotionAvgFilter

  constructor (id, name, txPower) {
    this.id = id
    this.name = name
    this.txPower = txPower
    this.rssi = 0
    this.maxRSSI = -1000
    this.minRSSI = 1000
    this.filteredRSSI = 0
    this.filter = new MotionAvgFilter(50)
  }

  setFilteredRSSI(newRSSI) {
    this.filter.step(newRSSI)
    let filtered = this.filter.currentState()
    this.filteredRSSI = Math.round(filtered * 10) / 10
  }

  setRSSI(rssi) {
    this.rssi = rssi
    this.setFilteredRSSI(rssi)
  }

  setMaxRSSI(rssi) {
    if (rssi > this.maxRSSI) {
      this.maxRSSI = rssi
    }
  }

  setMinRSSI(rssi) {
    if (rssi < this.minRSSI) {
      this.minRSSI = rssi
    }
  }
}