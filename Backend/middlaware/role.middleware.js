class RoleMiddleware {
    checkRole(...allowedRoles) {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have permission to access this resource'
                });
            }

            next();
        };
    }

    isAdmin(req, res, next) {
        return this.checkRole('admin')(req, res, next);
    }

    isPharmacist(req, res, next) {
        return this.checkRole('admin', 'pharmacist')(req, res, next);
    }

    isCashier(req, res, next) {
        return this.checkRole('admin', 'pharmacist', 'cashier')(req, res, next);
    }
}
export default new RoleMiddleware()