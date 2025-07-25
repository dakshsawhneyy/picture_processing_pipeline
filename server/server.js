const express = require('express')
const uploadRoute = require('./routes/uploadRoute') 

const app = express()

app.use('/api', uploadRoute);

app.listen(9000, () => {
    console.log('Server is Running');
})