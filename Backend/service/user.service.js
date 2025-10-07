import User from "../models/User.model.js"
import authService from "./auth.service.js";


class UserService {
    async createUser(userData) {
        const { email, password, role } = userData;
        const existingUser = await User.findOne({ email })

        const adminExists = await User.findOne({ role: 'admin' });

        let finalRole = role;

        // Allow first admin only if no admin exists
        if (!adminExists && role === 'admin') {
            // First admin can register as admin
            finalRole = 'admin';
        } else if (role === 'admin') {
            // Prevent others from registering as admin
            finalRole = 'cashier'; // ⚡ fallback to a valid role
        } else if (['pharmacist', 'cashier'].includes(role)) {
            finalRole = role;
        } else {
            finalRole = 'cashier'; // default if invalid role is sent
        }

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashPassword = await authService.hashPassword(userData.password)

        const user = new User({
            ...userData,
            role: finalRole,
            password: hashPassword
        });
        await user.save();

        const userObject = user.toObject()
        delete userObject.password;
        delete userObject.refreshToken;

        return userObject
    }

    async getAllUser(filter = {}) {
        const user = await User.find(filter)
            .select('-password -refreshToken')
            .sort({ createdAt: -1 })
        return user;
        return user
    }

    async getUserById(userId) {
        console.log("from service", userId)
        const user = await User.findById(userId).select('-password -refreshToken')
        if (!user) {
            throw new Error('User not Found')
        }
        return user
    }

    async updateUser(userId, updateData) {
        if (updateData.password) {
            updateData.password = await authService.hashPassword(updateData.password)
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -refreshToken')

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            throw new Error('User not Found')
        }
        return { message: 'User Deleted Successfully' }
    }

    async getUserByEmail(email) {
        return await User.findOne({ email })
    }
}
export default new UserService()
