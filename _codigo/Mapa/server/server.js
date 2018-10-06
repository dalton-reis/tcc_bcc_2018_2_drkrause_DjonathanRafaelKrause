let express = require('express')
var cors = require('cors')

let app = express()
app.use(cors({ origin: '*' }))
require('./routes')(app);

app.get('/', function (req, res) {
  console.log('Server online!')
  res.send('Server online!')
})

app.listen(8081)


