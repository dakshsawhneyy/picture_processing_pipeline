const express = require('express')

const app = express()

app.use('/api', require('./routes/uploadRoute'))

app.listen(9000)