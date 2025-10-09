import React from 'react'
import { userAuth } from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const {isAuthenticated } = userAuth()
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace/>
    }
  return (
    <div className='min-h-screen'>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
