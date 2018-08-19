var Location = require('./Location');

class Map {
  constructor() {
    this.locations = [];
    this.matrix = [];
    this.matrixLen = 5;

    for (let row = 0; row < this.matrixLen; row++) {
      this.matrix[row] = [];
      for (let column = 0; column < this.matrixLen; column++) {
        this.matrix[row][column] = ".";
      }
    }
  }

  show() {
    console.log("Showing Map");
  
    let matrixStr = "";
    for (let location of this.locations) {
      this.matrix[location.position.cartesian.y][location.position.cartesian.x] = "x";
    }

    for (let row = 0; row < this.matrix.length; row++) {
      for (let column = 0; column < this.matrix[row].length; column++) {
        matrixStr += (this.matrix[row][column] + "\t");
      }
      console.log(matrixStr);
      matrixStr = "";
      console.log("");
    }
    
  }

  addLocation(loc) {
    let location = new Location();
    location.position.cartesian.x = loc.x;
    location.position.cartesian.y = loc.y;
    location.info = loc.message;
    this.locations.push(location);
  }

  resetMap() {
    for (let row = 0; row < this.matrixLen; row++) {
      this.matrix[row] = [];
      for (let column = 0; column < this.matrixLen; column++) {
        this.matrix[row][column] = ".";
      }
    }
  }
} 



module.exports = Map;