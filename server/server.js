const express = require('express')
const uploadRoute = require('./routes/uploadRoute') 
const path = require('path')

const app = express()

app.use('/api', uploadRoute);

// join path where you are running, it should be opened correctly where server.js is placed
app.use('/processed', express.static(path.join(__dirname, 'processed')))  // if someone opens /processed, serve them files in processed folder

app.listen(9000, () => {
    console.log('Server is Running');
})

// ! express.static makes publically accessible to browser