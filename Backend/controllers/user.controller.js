import userService from "../service/user.service.js"

class UserController {
    async CreateUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const { role, isActive } = req.query;
            const filter = {};
            if (role) {
                filter.role = role;
            }
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true'
            }
            const users = await userService.getAllUser(filter)
            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id)
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body)

            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }
    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id)
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });

        }
    }

}
export default new UserController()