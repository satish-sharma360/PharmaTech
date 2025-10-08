import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'
console.log(API_URL)

const axiosInstance = axios.create({
    baseURL : API_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

// request interceptor - Add toke to every request

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

// Response Interceptor  - Handle token refresh
axiosInstance.interceptors.response.use(
    (response)=> response,
    async (error) =>{
        const originalRequest = error.config;

        // if token expired , try to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                const response = await axios.post(`${API_URL}/auth/refresh-token`,{
                    refreshToken,
                })
                const {accessToken} = response.data.data;
                localStorage.setItem('accessToken',accessToken)
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return axiosInstance(originalRequest)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                window.location.href = '/login'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
export default axiosInstance