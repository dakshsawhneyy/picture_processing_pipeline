const { Queue } = require('bullmq')
const IORedis = require('ioredis')

// creating connection with redis
const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
})

const processing_queue = new Queue('image-processing-q', {connection})

// pushing items inside this q
async function init(){
    const response = await processing_queue.add('Image Processsing', {
        imageID: Math.floor(Math.random() * 1000000), // random image ID of 1-6 digits
        path: `s3://picture-processing-pipeline/image.jpg`,
    })
    console.log('Job Added', response.data)
}

init()

module.exports = processing_queue