import axiosInstance from "./axios";

class AuthApi {
    async register(userdata) {
        const response = await axiosInstance.post('/auth/register', userdata)
        console.log("Register response", response)
        return response.data
    }

    async login(credentials) {
        // console.log("Posting to:", `${API_URL}/auth/login`)
        const response = await axiosInstance.post('/auth/login', credentials)
        const data = response.data;

        console.log("Login response", data)
        if (data.success) {
            const { accessToken, refreshToken, user } = data.data;
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('user', JSON.stringify(user))
        }
        return data
    }
    async logOut() {
        const response = await axiosInstance.post('/auth/logout')
        console.log("logout response", response)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        return response.data;
    }

    async getUser() {
        const response = await axiosInstance.get('/auth/me')
        console.log("get User", response)
        return response.data
    }

    async refreshToken() {
        const response = await axiosInstance.post('/auth/refresh-token', {
            refreshToken
        })
        console.log("Refresh Token", response)
        return response.data
    }
}
export default new AuthApi()