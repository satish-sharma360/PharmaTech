import authService from "../service/auth.service";
import tokenService from "../service/token.service";
import userService from "../service/user.service.js";

class AuthController {
    async register(req, res) {
        try {
            const user = await userService.createUser(req.body)
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email)
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }
            if (!user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: 'Your account has been deactivated'
                });
            }

            const isPasswordValid = await authService.comparePassword(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const accessPayload = {
                _id: user._id,
                role: user.role
            };
            const refreshPayload = {
                _id: user._id,
            };
            const accessToken = tokenService.generateAccessToken(accessPayload)
            const refreshToken = tokenService.generateRefreshToken(refreshPayload)

            await tokenService.saveRefreshToken(user._id, refreshToken)

            const userResponse = user.toObject();
            delete userResponse.password;
            delete userResponse.refreshToken;

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: userResponse,
                    accessToken,
                    refreshToken
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required'
                });
            }

            const decoded = tokenService.verifyRefreshToken(refreshToken)

            const user = await userService.getUserById(decoded.userId);

            const userWithToken = await userService.getUserByEmail(user.email)
            if (userWithToken.refreshToken !== refreshToken) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid Refresh token'
                });
            }

            const accessPayload = {
                _id: user._id,
                role: user.role
            };

            const newAccessToken = tokenService.generateAccessToken(accessPayload)

            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    accessToken: newAccessToken
                }
            });
        } catch (error) {
            res.status(403).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }
    }

    async logout(req, res) {
        try {
            await tokenService.removeRefreshToken(req.user.userId)
            res.status(200).json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const user = userService.getUserById(req.user.userId);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
} 

export default new AuthController()