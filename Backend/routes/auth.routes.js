import express from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddlaware from '../middlaware/auth.middlaware.js'

const authRouter = express.Router()

authRouter.post('/register', authController.register.bind(authController))
authRouter.post('/login', authController.login.bind(authController))
authRouter.post('/refresh-token', authController.refreshToken.bind(authController))
authRouter.post('/logout', authMiddlaware.verifyToken.bind(authMiddlaware) ,authController.logout.bind(authController))
authRouter.get('/me', authMiddlaware.verifyToken.bind(authMiddlaware) ,authController.getCurrentUser.bind(authController))

export default authRouter