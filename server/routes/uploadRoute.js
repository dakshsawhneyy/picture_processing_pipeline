const express = require('express');
const { uploadController } = require('../controllers/uploadController.js');
const upload = require('../middleware/multer.js');

const uploadRouter = express.Router()

uploadRouter.post('/upload', upload.single('file'), uploadController)  // file upload

module.exports = uploadRouter;