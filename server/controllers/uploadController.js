const processing_queue = require('../queues/producer')

// Api for uploading picture and adding it to message-queue
const uploadController = async(req,res) => {
    try {
        const file = req.file;  // get image as file as response in form-data
        
        if (!file){
            return res.status(400).json({error: 'No File Found'});
        }

        // push image to queue
        const job = await processing_queue.add('Image Processsing', {
            imageID: Math.floor(Math.random() * 100000),
            filename: file.filename,
            path: file.path
        })

        res.status(200).json({success: true, message: 'Image is ready for processing', jobID: job.id})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Creating API for fetching Job Status so user can see
const getJobStatus = async(req,res) => {
    try {
        const JobID = req.params.id;   // fetch id from url [url:id]

        const jobInfo = await processing_queue.getJob(JobID);

        // Base Case - If no jobInfo found, return error
        if(!jobInfo){
            return res.status(404).json({success: false, message: 'Job not found'});
        }

        // fetch state from jobInfo and fetch processed data
        const state = await jobInfo.getState();

        // handle if state is failed or job gets failed
        if(state === 'failed'){
            const failedReason = jobInfo.failedReason;
            return res.status(500).json({
                success: false, 
                message: 'Job Failed', 
                jobID: JobID, 
                state: state,
                error: failedReason
            });
        }

        const result = jobInfo.returnvalue; // processed data

        // Return Image URL too     // converting image to url so we can access this from frontend      // basename extracts only name from whole url
        const imageURL = result && result.resized ? `${req.protocol}://${req.get('host')}/processed/${result.resized}` : null   //* http://localhost:3000/processed/predator.jpeg

        return res.status(200).json({
            success: true, 
            message: 'Job Status Fetched Successfully', 
            jobID: JobID, 
            state: state, 
            data: result || 'No Result Yet',
            imageURL: imageURL
        });

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

module.exports = {uploadController, getJobStatus}