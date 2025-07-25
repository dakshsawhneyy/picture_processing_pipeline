const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'uploads/')  // save it to uploads folder
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage})

module.exports = upload