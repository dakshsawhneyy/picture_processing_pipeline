const processing_queue = require('')

const uploadController = async(req,res) => {
    try {
        const file = req.file;  // get file as response in form-data
        
        if (!file){
            return res.status(400).json({error: 'No File Found'});
        }

        // push image to queue
        await processing_queue.add('Image Processsing', {
            filename: file.filename,
            path: file.path
        })

        res.status(200).json({success: true, message: 'Image is ready for processing', JobID: job.id})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

module.exports =  {uploadController, getJobStatus}