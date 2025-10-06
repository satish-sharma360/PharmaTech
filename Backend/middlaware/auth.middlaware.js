import tokenService from "../service/token.service.js";

class AuthMiddleware {
    async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided. Please login first'
                });
            }
            const token = authHeader.split(' ')[1];
            const decoded = tokenService.verifyAccessToken(token);
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token. Please login again'
            });
        }
    }
}
export default new AuthMiddleware()