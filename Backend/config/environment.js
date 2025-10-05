import dotenv from 'dotenv';

dotenv.config();


class EnvironmentConfig {
    constructor() {
        this.PORT = process.env.PORT || 5000;
        this.MONGODB_URI = process.env.MONGODB_URI;
        this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        this.JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
        this.JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';
        this.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
        this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
        this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
    }

    validateConfig() {
        const requiredVars = [
            'MONGODB_URI',
            'JWT_ACCESS_SECRET',
            'JWT_REFRESH_SECRET',
            'CLOUDINARY_CLOUD_NAME',
            'CLOUDINARY_API_KEY',
            'CLOUDINARY_API_SECRET'
        ]

        const missing = requiredVars.filter(varname => !this[varname])

        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
        }
    }
}
export default new EnvironmentConfig()