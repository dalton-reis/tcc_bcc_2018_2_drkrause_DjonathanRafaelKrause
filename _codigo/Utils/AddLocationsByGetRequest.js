const http = require('http');

let myData = `{
  "x": 1,
  "y": 2,
  "message": "Hello from QR 2!"
}`;

http.get('http://192.168.65.1:4567/fromIonic/get/' + myData, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



