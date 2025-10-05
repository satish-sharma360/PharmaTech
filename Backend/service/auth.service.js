import bcrypt from 'bcrypt'
class AuthService{
    async hashPassword(password){
        return await bcrypt.hash(password ,10)
    }
    async comparePassword(password ,userPassword){
        return await bcrypt.compare(password ,userPassword)
    }
}
export default new AuthService()