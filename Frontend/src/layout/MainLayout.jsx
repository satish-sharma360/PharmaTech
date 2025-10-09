import React from 'react'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar - takes up fixed width */}
      <Sidebar />

      {/* Main content area */}
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
