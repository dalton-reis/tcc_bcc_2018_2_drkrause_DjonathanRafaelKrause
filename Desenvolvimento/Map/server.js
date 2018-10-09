// Imports
let express = require('express')
let cors = require('cors')

// Configuração do server
let app = express()
app.use(cors())
app.use(express.static('./public'))

require('./routes')(app)

// Start server na porta 8081
app.listen(8081)


