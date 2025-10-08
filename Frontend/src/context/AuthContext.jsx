import { createContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading , setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(()=>{
        checkAuth()
    },[])

    const checkAuth = () => {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('accessToken')
        console.log("Check Auth User" , storedUser)
        console.log("Check Auth Token" , token)
        if (storedUser && token) {
            setUser(JSON.stringify(storedUser))
            setIsAuthenticated(true)
        }
        setLoading(false)
    }  

    const login = async (credentials) =>{
        try {
            const response = await authApi.login(credentials)
            console.log("Auth Login" ,response)
            if (response.data.success) {
                setUser(response.data.user)
                setIsAuthenticated(true)
                return response
            }
        } catch (error) {
            throw error
        }
    }
    const logOut = async () =>{
        try {
            await authApi.logOut();
        } catch (error) {
            console.error('logout error' ,error)
        }finally{
            setUser(null);
            setIsAuthenticated(false)
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    const hasRole = (roles) =>{
        if (!user) {
            return false
        }
        return roles.includes(user.role);
    }

    const value ={
        user,
        loading ,
        isAuthenticated,
        login,
        logOut,
        hasRole
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}