import jwt from 'jsonwebtoken'
import environment from '../config/environment.js'
import User from '../models/User.model.js'

class TokenService {
    generateAccessToken(payload) {
        return jwt.sign(payload, environment.JWT_ACCESS_SECRET, {
            expiresIn: environment.JWT_ACCESS_EXPIRY
        })
    }
    generateRefreshToken(payload) {
        return jwt.sign(payload, environment.JWT_REFRESH_SECRET, {
            expiresIn: environment.JWT_REFRESH_EXPIRY
        })
    }
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, environment.JWT_ACCESS_SECRET)
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, environment.JWT_REFRESH_SECRET)
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async saveRefreshToken(userId, refreshToken){
        await User.findByIdAndUpdate(userId,{refreshToken})
    }

    async removeRefreshToken(userId){
        await User.findByIdAndUpdate(userId,{refreshToken : null})
    }
    
}
export default new TokenService()