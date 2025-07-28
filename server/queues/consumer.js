const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const sharp = require('sharp');     // used for 
const path = require('path');   // helps in path determination when working with files and directories 
const fs = require('fs')    // helps in working with file system and files


// creating connection for redis
const connection = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
})

const worker = new Worker('image-processing-q', async(job) => {
    try {
        const {filename, path: filepath, imageID} = job.data;     // extract from job.data  // using filepath so it doesnt overrides path library

        // joining path segments; __dirname means curr dirr; '..' means go one level up & processed is folder
        const outputDir = path.join(__dirname, '..', 'processed');    
        if(!fs.existsSync(outputDir)){      // Base Case: if output dir is not formed, then make it
            fs.mkdirSync(outputDir);    // if output dir is not present, then make it
        }

        const outputFileName = `resized-${filename}`
        const outputPath = path.join(outputDir, outputFileName);

        // Resize image using sharp
        await sharp(filepath).resize(300,300).toFile(outputPath);    // resize to 300*300

        return {
            message: `Image Processed Successfully for ID: ${job.id}`,
            imageID: job.data.imageID,
            originalFile: filepath,
            resized: outputFileName
        }

    } catch (error) {
        console.error(`Error in processing job ID: ${job.id}`, err);
        throw err; // so that it’s caught in worker.on('failed')
    }
}, { connection })

// handling if success
worker.on('completed', (job) => {
    console.log('');
    console.log(`job completed of ID: ${job.id}: ${job.data.filename}`);
    console.log('');
})

// handling error
worker.on('failed', (job,err) => {
    console.log(`Job Failed: ${job.id}, Error: ${err}`)
})