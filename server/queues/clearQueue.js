const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
});

const queue = new Queue('image-processing-q', { connection });

async function clearJob() {
    try {
        console.log('Draining queue...');
        await queue.drain(); // removes waiting and delayed jobs

        console.log('Cleaning failed jobs...');
        await queue.clean(0, 100, 'failed'); // age = 0ms, limit = 100

        console.log('Cleaning completed jobs...');
        await queue.clean(0, 100, 'completed');

        console.log('Queue cleared successfully');
    } catch (error) {
        console.error('Error clearing queue:', error);
    } finally {
        await queue.close();      // gracefully close BullMQ connection
        await connection.quit();  // close Redis connection
        process.exit();           // exit after cleanup
    }
}

clearJob();
