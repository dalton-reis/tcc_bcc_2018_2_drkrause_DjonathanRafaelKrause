module.exports = class Queue {
  constructor () {
    this.dados = []
  }

  add (dado) {
    this.dados.push(dado)
  }

  addAll (allData) {
    // [ obj: id: ___, rssi: ___ ]
    if (allData !== undefined && allData !== null) {
      for (let i = 0; i < allData.length; i++) {
        console.log(allData[i].id + " - " + allData[i].rssi)
        this.add({ id: allData[i].id, rssi: allData[i].rssi })
      }
    }
  }

  remove () {
    if (!this.empty()) {
      return this.dados.shift()
    } else {
      return null
    }
  }

  show () {
    return this.dados
  }

  empty () {
    return this.dados.length === 0
  }

  reset () {
    this.dados = []
  }

}
