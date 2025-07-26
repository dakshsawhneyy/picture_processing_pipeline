const express = require('express');
const { uploadController, getJobStatus } = require('../controllers/uploadController.js');
const upload = require('../middleware/multer.js');

const uploadRouter = express.Router()

uploadRouter.post('/upload', upload.single('file'), uploadController)  // file upload
uploadRouter.get('/status/:id', getJobStatus)

module.exports = uploadRouter;