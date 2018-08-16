class Map {
  constructor() {
    this.locations = [];
    this.matrix = [];

    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix[row].length; column++) {
        this.matrix[row][column] = ".";
      }
    }
      }

  show() {
    for (let location of this.locations) {
      let pos = location.getCartesianPosition();
      //this.matrix[pos.x][pos.y];
      //this.matrix[qr.getX()-1][qr.getY()-1] = "x";
    }

    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix[row].length; column++) {
        console.log(this.matrix[row][column] + "\t");
      }
      console.log("");
    }
  }

  addLocation(loc) {
    this.locations.push(loc);
  }
}
