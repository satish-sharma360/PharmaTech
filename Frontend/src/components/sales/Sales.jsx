import React, { useState, useEffect } from 'react';
import saleApi from '../../api/saleApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      // TODO: Connect to your backend
      const response = await saleApi.getAllSales();
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Invoice #', accessor: 'invoiceNumber' },
    { 
      header: 'Customer', 
      render: (row) => row.patient?.name || 'Walk-in'
    },
    { header: 'Items', render: (row) => row.items.length },
    { header: 'Total', render: (row) => formatCurrency(row.finalAmount) },
    { 
      header: 'Payment', 
      render: (row) => (
        <span className="capitalize badge badge-info">{row.paymentMethod}</span>
      )
    },
    { header: 'Date', render: (row) => formatDateTime(row.createdAt) },
    { 
      header: 'Status', 
      render: (row) => (
        <span className="capitalize badge badge-success">{row.status}</span>
      )
    },
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Sales History</h1>
      <Card>
        <Table columns={columns} data={sales} />
      </Card>
    </div>
  );
};

export default Sales;
