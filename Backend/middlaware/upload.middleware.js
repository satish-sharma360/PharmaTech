import multer from 'multer'

class MulterMiddleware{
    constructor(){
        this.storage = multer.diskStorage({
            destination:function(req,file,cb){
                cb(null , './public')
            },
            filename:function(req,file,cb){
                cb(null , file.originalname)
            }
        })
        this.upload = multer({ storage :this.storage})
    }
}
export default new MulterMiddleware()