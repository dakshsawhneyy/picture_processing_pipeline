import processing_queue from "../queues/producer";

const uploadController = async(req,res) => {
    try {
        const { originalName, path } = req.file;
        
        const filePath = req.file.path // s3://picture-processing-pipeline/image.jpg

        const job = processing_queue.add('Image Processing', {
            imageID: Math.floor(Math.random() * 1000000), // random image ID of 1-6 digits
            path: filePath,
            fileName: originalName
        })

        res.status(200).json({success: true, message: 'Job Submitted', JobID: job.id})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getJobStatus = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {uploadController, getJobStatus}