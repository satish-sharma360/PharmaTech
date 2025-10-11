import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard'
import { ROLES } from './utils/constants'
import Users from './pages/Users'
import Medicines from './components/medicines/Medicines'
import Patients from './components/patients/Patients'
import Prescriptions from './components/prescription/Prescriptions'
import POS from './pages/POS'
import Sales from './components/sales/Sales'
import Inventory from './components/inventory/Inventory'
import Reports from './components/reports/Reports'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route element ={<AuthLayout/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>

      {/* Protected routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout/>
        </ProtectedRoute>
      }
      >

        {/* Dashboard - All Roles */}
        <Route path='/dashboard' element={<Dashboard/>}/>

        {/* User management  - Admin Only */}
        <Route path='/users' element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <Users/>
          </ProtectedRoute>
        }/>

        {/* Medicines - All Roles (different Permissions) */}
        <Route path='/medicines' element={<Medicines/>}/>

        {/* Patients - All Roles */}
        <Route path='/patients' element={<Patients/>}/>

        {/* Prescription - All Roles */}
        <Route path='/prescriptions' element={<Prescriptions/>}/>

        {/* POS (Point Of sale) - All Roles */}
        <Route path='/pos' element={<POS/>}/>

        {/* Sales - All Roles */}
        <Route path='/sales' element={<Sales/>}/>

        {/* Inventory - All Roles (different permission) */}
        <Route path='/inventory' element={<Inventory/>}/>

        {/* Reports - Admin & Pharmacist */}

        <Route path='/reports' element={
          <ProtectedRoute roles={[ROLES.ADMIN , ROLES.PHARMACIST]}>
            <Reports/>
          </ProtectedRoute>
        }/>

        {/* Profile */}
        <Route path='/profile' element={<Profile/>}/>

        {/* Default Routes */}
        <Route path='/' element={<Navigate to='/dashboard' replace/>}/>
        <Route path='*' element={<NotFound/>}/>



      </Route>
      
    </Routes>
  )
}

export default App
