import processing_queue from "../queues/producer.js";

const uploadController = async(req,res) => {
    try {
        const { originalname, path } = req.file;    // it comes from multer
        
        const filePath = req.file.path // s3://picture-processing-pipeline/image.jpg

        const job = await processing_queue.add('Image Processing', {
            imageID: Math.floor(Math.random() * 1000000), // random image ID of 1-6 digits
            path: filePath,
            fileName: originalname
        })

        res.status(200).json({success: true, message: 'Job Submitted', JobID: job.id})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getJobStatus = async(req,res) => {
    try {
        const JobID = req.params.id;    // it comes from url

        const job = await processing_queue.getJob(JobID)

        // Base Case
        if (!job){
            return res.status(404).json({success:false,message:'Job Not Found'})
        }

        const state = await job.state();
        const result = await job.returnvalue; 

        res.json({
            success: true,
            message: 'Job Status Retrieved',
            JobID: job.id,
            state: state,
            result: result
        });

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {uploadController, getJobStatus}