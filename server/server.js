const express = require('express')
const { appendFile } = require('fs')

const app = express()

app.use('/api', require('./routes/uploadRoute'))

app.listen(9000)