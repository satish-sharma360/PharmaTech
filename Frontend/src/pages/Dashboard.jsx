import React, { useState, useEffect } from 'react';
import saleApi from '../api/saleApi';
import medicineApi from '../api/medicineApi';
import { FaShoppingCart, FaPills, FaExclamationTriangle, FaDollarSign, FaUsers } from 'react-icons/fa';
import { formatCurrency, formatDateTime } from '../utils/helpers';
import Loader from '../components/common/Loader';
import Card from '../components/common/Card';
import { userAuth } from '../hooks/useAuth';

const Dashboard = () => {
const {user} = userAuth()


  const [stats, setStats] = useState({
    todaySales: 0,
    todayRevenue: 0,
    lowStockCount: 0,
    expiringCount: 0,
  });
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockMedicines, setLowStockMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    console.log("Context User:", user);
  }, [user]);
  console.log("hellow")

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const salesResponse = await saleApi.getTodaySales();
      console.log(salesResponse)
      setStats((prev) => ({
        ...prev,
        todaySales: salesResponse.count,
        todayRevenue: salesResponse.totalRevenue,
      }));
      setRecentSales(salesResponse.data.slice(0, 5));

      // Fetch low stock medicines
      const lowStockResponse = await medicineApi.getLowStockMedicines();
      setStats((prev) => ({
        ...prev,
        lowStockCount: lowStockResponse.count,
      }));
      setLowStockMedicines(lowStockResponse.data.slice(0, 5));

      // Fetch expiring medicines
      const expiringResponse = await medicineApi.getExpiringMedicines(30);
      setStats((prev) => ({
        ...prev,
        expiringCount: expiringResponse.count,
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

//   if (loading) {
//     return <Loader fullScreen />;
//   }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your pharmacy today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Sales */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Sales</p>
              <h3 className="text-3xl font-bold mt-2">{stats.todaySales}</h3>
            </div>
            <FaShoppingCart size={40} className="text-blue-200" />
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today's Revenue</p>
              <h3 className="text-3xl font-bold mt-2">
                {formatCurrency(stats.todayRevenue)}
              </h3>
            </div>
            <FaDollarSign size={40} className="text-green-200" />
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Low Stock Items</p>
              <h3 className="text-3xl font-bold mt-2">{stats.lowStockCount}</h3>
            </div>
            <FaPills size={40} className="text-orange-200" />
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Expiring Soon</p>
              <h3 className="text-3xl font-bold mt-2">{stats.expiringCount}</h3>
            </div>
            <FaExclamationTriangle size={40} className="text-red-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card title="Recent Sales">
          {recentSales.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No sales today</p>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div
                  key={sale._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {sale.invoiceNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(sale.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(sale.finalAmount)}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {sale.paymentMethod}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Low Stock Alert */}
        <Card title="Low Stock Alert">
          {lowStockMedicines.length === 0 ? (
            <p className="text-gray-500 text-center py-4">All items well stocked</p>
          ) : (
            <div className="space-y-3">
              {lowStockMedicines.map((medicine) => (
                <div
                  key={medicine._id}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{medicine.name}</p>
                    <p className="text-sm text-gray-600">{medicine.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      {medicine.stock}
                    </p>
                    <p className="text-xs text-gray-500">in stock</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center">
            <FaShoppingCart className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-sm font-semibold text-gray-700">New Sale</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center">
            <FaPills className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-sm font-semibold text-gray-700">Add Medicine</p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center">
            <FaUsers className="mx-auto text-purple-600 mb-2" size={24} />
            <p className="text-sm font-semibold text-gray-700">Add Patient</p>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition text-center">
            <FaExclamationTriangle className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-sm font-semibold text-gray-700">View Reports</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;