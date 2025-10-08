import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const userAuth = () =>{
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('UseAuth must be used within AuthProvider')
    }
    return context
}