import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import { Loader } from 'lucide-react'
import Login from './pages/auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/> */}
      {/* <Sidebar/> */}
      {/* <Loader/> */}
      <Login/>
    </>
  )
}

export default App
