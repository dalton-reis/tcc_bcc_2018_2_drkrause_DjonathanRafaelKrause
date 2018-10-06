// Imports
let express = require('express')
var cors = require('cors')

// Configuração do server
let app = express()
app.use(cors({ origin: '*' }))
app.use(express.static('./public'));

require('./routes')(app);

// Start server na porta 8081
app.listen(8081)


