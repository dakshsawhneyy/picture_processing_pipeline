const express = require('express')
const uploadRoute = require('./routes/uploadRoute') 
const path = require('path')
const Arena = require('bull-arena')
const basicAuth = require('express-basic-auth')
const { Queue } = require('bullmq')
require('dotenv').config

const app = express();

app.use('/api', uploadRoute);

// join path where you are running, it should be opened correctly where (__dirname) -> server.js is placed
app.use('/processed', express.static(path.join(__dirname, 'processed')))  // if someone opens /processed, serve them files in processed folder

// Api calling for Bull Arena - Dashboard for our queues
app.use('/arena', 
    basicAuth({     // this acts as a middleware in between route and Arena 
        users: { [process.env.BASIC_AUTH_ADMIN]: process.env.BASIC_AUTH_ADMIN },      // username: admin, password: is in env
        challenge: true     // causes browser to show login prompt
    }),
    Arena({
        BullMQ: Queue,
        queues: [
            {
                type: 'bullmq',     // queue type
                name: 'image-processing-q',     // name of the queue
                hostId: 'Image Processing Queue',   // Label shown in UI
                redis:{
                    host: '127.0.0.1',
                    port: 6379
                }
            }
        ]
    },{
        basePath: '/arena',     // Arena UI will be served at this path
        disableListen: true     // Don't start its own server; the Arena
    })
)

app.listen(9000, () => {
    console.log('Server is Running');
})

// ! express.static makes publically accessible to browser