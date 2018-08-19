class Location {
    constructor() {
        this.oid = null;
        this.info = null;

        this.position = {
            cartesian: {x: null, y: null},
            geo: {lat: null, lon: null}
        };
    }

    getCartesianPosition() {        
        throw new Error('You have to implement the method getCartesianPosition!');
    }

    getGeoPosition() {
        throw new Error('You have to implement the method getGeoPosition!');
    }

} module.exports = Location;

