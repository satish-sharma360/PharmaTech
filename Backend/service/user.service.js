import User from "../models/User.model.js"
import authService from "./auth.service.js";


class UserService {
    async createUser(userData){
        const existingUser = await User.findOne({email:userData.email})

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashPassword = await authService.hashPassword(userData.password)

        const user = new User({
            ...userData,
            password:hashPassword
        });
        await user.save();

        const userObject = user.toObject()
        delete userObject.password;
        delete userObject.refreshToken;

        return userObject
    }

    async getAllUser(filter = {}){
        const user = (await User.find(filter)
        .select('-password -refreshToken'))
        .toSorted({createdAt:-1})
        return user
    }

    async getUserById(userId){
        const user = await User.findById(userId).select('-password -refreshToken')
        if (!user) {
            throw new Error('User not Found')
        }
        return user
    }

    async updateUser(userId , updateData){
        if (updateData.password) {
            updateData.password = await authService.hashPassword(updateData.password)
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            {new:true ,runValidators:true}
        ).select('-password -refreshToken')

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    async deleteUser(userId){
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            throw new Error('User not Found')
        }
        return {message:'User Deleted Successfully'}
    }

    async getUserByEmail(email){
        return await User.findOne({email})
    }
}
export default new UserService()
