const { Worker } = require('bullmq')
const IORedis = require('ioredis')

// creating connection for redis
const connection = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
})

const worker = new Worker('image-processing-q', async(job) => {
    console.log(`Message recieved for id: ${job.id}`)
    console.log(`Job Data: `, job.data)

    await new Promise(res => setTimeout(res, 2000))

    // Actual Logic

    console.log('Finished Processing for ID: ', job.id)

    return {
        message: `Image Processed Successfully for ID: ${job.id}`,
        imageID: job.data.imageID,
        originalFile: job.data.fileName,
    }
}, { connection })

// handling if success
// worker.on('completed', (job) => {
//     console.log(`job completed of ID: ${job.id}`)
// })

// handling error
worker.on('failed', (job,err) => {
    console.log(`Job Failed: ${job.id}, Error: ${err}`)
})
