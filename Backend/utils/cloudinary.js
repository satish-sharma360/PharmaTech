import { v2 as cloudinary } from 'cloudinary'
import environment from '../config/environment.js'
import fs from 'fs'

class CloudinaryUtil {
    constructor() {
        cloudinary.config({
            cloud_name: environment.CLOUDINARY_CLOUD_NAME,
            api_key: environment.CLOUDINARY_API_KEY,
            api_secret: environment.CLOUDINARY_API_SECRET
        })
    }
    async upload(localFilePath) {
        try {
            if (!localFilePath) {
                return null
            }
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
            fs.unlinkSync(localFilePath)
            return response.secure_url
        } catch (error) {
            console.error("Cloudinary Upload Error:", error.message);
            fs.unlinkSync(localFilePath); // cleanup temp file
            return null;
        }
    }
}
export default new CloudinaryUtil()