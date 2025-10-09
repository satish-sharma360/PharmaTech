import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { userAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {user,logOut} = userAuth()
    const navigate = useNavigate()
    const handleLogout = async()=>{
      await logOut()
      navigate('/login')
    }
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">
            Pharmacy Management
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative text-gray-600 hover:text-primary">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <FaUserCircle size={32} className="text-gray-600" />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
          >
            <FaSignOutAlt size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
