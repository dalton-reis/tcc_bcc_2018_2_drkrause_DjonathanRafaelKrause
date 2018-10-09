module.exports = class Queue {
  constructor () {
    this.dados = []
  }

  add (dado) {
    this.dados.push(dado)
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
