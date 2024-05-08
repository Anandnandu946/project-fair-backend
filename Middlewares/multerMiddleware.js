const multer = require('multer')
//to store all multer data,All words are predefined

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //set image name
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//to filter image
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
       }else{
        callback(null,false)
        return callback(new Error("please uploads following image extention(png,jpeg,jpg)only.."))
       }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig