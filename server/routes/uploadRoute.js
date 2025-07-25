const express = require('express');
const { uploadController, getJobStatus } = require('../controllers/uploadController');
const upload = require('../middleware/multer');

const uploadRouter = express.Router()

uploadRouter.post('/upload', upload.single('image'), uploadController)  // file upload
uploadRouter.get('/status/:id', getJobStatus)   // get job status

module.exports = uploadRouter;