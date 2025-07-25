const uploadController = async(req,res) => {
    try {
        
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