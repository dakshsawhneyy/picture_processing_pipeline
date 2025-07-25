const { Worker } = require('bullmq')
const IORedis = require('ioredis')

// creating connection for redis
const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
})

const worker = new Worker('image-processing-q', async(job) => {
    console.log(`Message recieved for id: ${job.id}`)
    console.log(`Job Data: `, job.data)

    await new Promise(res => setTimeout(res, 2000))
    console.log('Finished Processing for ID: ', job.id)
}, { connection })