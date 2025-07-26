const multer = require('multer')

// This tells multer to store these files on local storage instead of on cloud or any other location
const storage = multer.diskStorage({
    destination:function(req, file, callback){      // stats where to store file
        callback(null, 'server/uploads/')  // save it to uploads folder
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage})

module.exports = upload