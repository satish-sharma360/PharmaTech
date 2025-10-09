import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import {
  DollarSign,
  FileBarChart,
  LayoutGrid,
  Menu,
  Package,
  Pill,
  Users,
  X,
} from "lucide-react";
import { FaUserInjured, FaFileAlt, FaCashRegister } from "react-icons/fa";
import { userAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/constants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, hasRole } = userAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutGrid,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
      roles: [ROLES.ADMIN], // Only Admin
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: Pill,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Patients",
      path: "/patients",
      icon: FaUserInjured,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Prescriptions",
      path: "/prescriptions",
      icon: FaFileAlt,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Point of Sale",
      path: "/pos",
      icon: FaCashRegister,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Sales History",
      path: "/sales",
      icon: DollarSign,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Package,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER],
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileBarChart,
      roles: [ROLES.ADMIN, ROLES.PHARMACIST],
    },
  ];

  const filteredMenu = menuItems.filter((item) => hasRole(item.roles));

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[9999] bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-blue-50 transition-all duration-300"
      >
        {isOpen ? (
          <X size={22} className="text-blue-500" />
        ) : (
          <Menu size={22} className="text-blue-500" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white h-screen border-r border-gray-200 flex flex-col justify-between transition-all duration-300 pt-16 shadow-sm`}
      >

        {/* Menu Items */}
        <nav className="flex flex-col mt-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-3 mx-2 my-1 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? "bg-blue-50 text-blue-600 before:absolute before:right-0 before:top-0 before:h-full before:w-[4px] before:bg-blue-600 shadow-sm"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <item.icon
                size={20}
                className="min-w-[20px] transition-colors duration-300"
              />
              {isOpen && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold">
              {user?.name?.[0] || "P"}
            </div>
            {isOpen && (
              <div>
                <p className="text-xs text-gray-700 font-medium">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-gray-500">
                  {user?.role || "Role"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
