module.exports = class Fila {
  constructor () {
    console.log("Criando fila")
    this.dados = []
  }

  add (dado) {
    this.dados.push(dado)
  }

  get () {
    if (!this.empty()) {
      return this.dados.shift()
    } else {
      return null
    }
  }

  getAll () {
    if (!this.empty()) {
      return this.dados
    } else {
      return null
    }
  }

  empty () {
    return this.dados.length === 0
  }

  reset () {
    this.dados = []
  }

}
