import React from 'react';
import { useState, useEffect } from 'react';
import reportApi from '../../api/reportApi';
import { FaFileAlt, FaChartLine, FaBoxes } from 'react-icons/fa';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [dailySalesData, setDailySalesData] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);
  const [reportsHistory, setReportsHistory] = useState([]);

  useEffect(() => {
    fetchReportsHistory();
  }, []);

  const fetchReportsHistory = async () => {
    try {
      const response = await reportApi.getAllReports();
      setReportsHistory(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const generateDailySalesReport = async () => {
    try {
      setLoading(true);
      const response = await reportApi.generateDailySalesReport();
      setDailySalesData(response.data.data);
      alert('Daily sales report generated successfully!');
      fetchReportsHistory();
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate daily sales report');
    } finally {
      setLoading(false);
    }
  };

  const generateInventoryReport = async () => {
    try {
      setLoading(true);
      const response = await reportApi.generateInventoryReport();
      setInventoryData(response.data.data);
      alert('Inventory report generated successfully!');
      fetchReportsHistory();
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate inventory report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

      {/* Report Generation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="text-center space-y-4">
            <FaChartLine size={48} className="mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold">Daily Sales Report</h3>
            <p className="text-gray-600">
              Generate comprehensive daily sales report with revenue and transaction details
            </p>
            <button
              onClick={generateDailySalesReport}
              className="btn-primary w-full"
              disabled={loading}
            >
              <FaFileAlt className="inline mr-2" />
              Generate Daily Sales Report
            </button>
          </div>
        </Card>

        <Card>
          <div className="text-center space-y-4">
            <FaBoxes size={48} className="mx-auto text-green-600" />
            <h3 className="text-xl font-semibold">Inventory Report</h3>
            <p className="text-gray-600">
              Generate inventory report with stock levels and low stock alerts
            </p>
            <button
              onClick={generateInventoryReport}
              className="btn-success w-full"
              disabled={loading}
            >
              <FaFileAlt className="inline mr-2" />
              Generate Inventory Report
            </button>
          </div>
        </Card>
      </div>

      {/* Daily Sales Report Display */}
      {dailySalesData && (
        <Card title="Daily Sales Report">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dailySalesData.totalSales}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(dailySalesData.totalRevenue)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Average Sale</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(dailySalesData.totalRevenue / dailySalesData.totalSales || 0)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Inventory Report Display */}
      {inventoryData && (
        <Card title="Inventory Report">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Medicines</p>
                <p className="text-2xl font-bold text-blue-600">
                  {inventoryData.totalMedicines}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {inventoryData.lowStockCount}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(inventoryData.totalInventoryValue)}
                </p>
              </div>
            </div>

            {inventoryData.lowStockMedicines?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Low Stock Items:</h4>
                <div className="space-y-2">
                  {inventoryData.lowStockMedicines.map((med) => (
                    <div key={med._id} className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="font-medium">{med.name}</span>
                      <span className="text-orange-600 font-bold">Stock: {med.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Reports History */}
      <Card title="Recent Reports">
        {reportsHistory.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reports generated yet</p>
        ) : (
          <div className="space-y-3">
            {reportsHistory.slice(0, 10).map((report) => (
              <div
                key={report._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{report.title}</p>
                  <p className="text-sm text-gray-600">
                    Generated on {formatDateTime(report.createdAt)}
                  </p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {report.reportType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Reports;