import multer from "multer"


//using multer for images
const storage = multer.diskStorage({
    destination:"./public/temp",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

export const upload = multer({storage,})