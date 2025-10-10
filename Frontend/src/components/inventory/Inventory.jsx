import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import { userAuth } from '../../hooks/useAuth';
import inventoryApi from '../../api/inventoryApi';
import medicineApi from '../../api/medicineApi';
import { FaPlus, FaBoxes } from 'react-icons/fa';
import { ROLES } from '../../utils/constants';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { formatDateTime } from '../../utils/helpers';

const Inventory = () => {
  const { hasRole } = userAuth();
  const [transactions, setTransactions] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    medicine: '',
    transactionType: 'purchase',
    quantity: '',
    batchNumber: '',
    notes: '',
  });

  const canModify = hasRole([ROLES.ADMIN, ROLES.PHARMACIST]);

  useEffect(() => {
    fetchTransactions();
    fetchMedicines();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await inventoryApi.getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await medicineApi.getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = {
        ...formData,
        quantity: parseInt(formData.quantity),
      };
      console.log('Submitting data:', submitData);
      await inventoryApi.addInventory(submitData);
      alert('Inventory transaction added successfully!');
      setIsModalOpen(false);
      setFormData({
        medicine: '',
        transactionType: 'purchase',
        quantity: '',
        batchNumber: '',
        notes: '',
      });
      fetchTransactions();
    } catch (error) {
      // console.error('Error adding inventory:', error);
      // alert(error.response?.data?.message || 'Failed to add inventory transaction');
    }
  };

  const columns = [
    { 
      header: 'Medicine', 
      render: (row) => row.medicine?.name || 'N/A'
    },
    { 
      header: 'Type', 
      render: (row) => (
        <span className={`badge ${
          row.transactionType === 'purchase' ? 'badge-success' :
          row.transactionType === 'sale' ? 'badge-info' :
          row.transactionType === 'expired' ? 'badge-danger' :
          'badge-warning'
        }`}>
          {row.transactionType}
        </span>
      )
    },
    { 
      header: 'Quantity', 
      render: (row) => (
        <span className={row.quantity < 0 ? 'text-red-600' : 'text-green-600'}>
          {row.quantity > 0 ? '+' : ''}{row.quantity}
        </span>
      )
    },
    { header: 'Previous Stock', accessor: 'previousStock' },
    { header: 'Current Stock', accessor: 'currentStock' },
    { header: 'Batch', accessor: 'batchNumber' },
    { 
      header: 'Date', 
      render: (row) => formatDateTime(row.createdAt)
    },
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        {canModify && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Transaction</span>
          </button>
        )}
      </div>

      <Card title="Transaction History">
        <Table columns={columns} data={transactions} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Inventory Transaction"
        size="medium"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medicine *
            </label>
            <select
              name="medicine"
              value={formData.medicine}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Medicine</option>
              {medicines.map((med) => (
                <option key={med._id} value={med._id}>
                  {med.name} (Stock: {med.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type *
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="purchase">Purchase (Add Stock)</option>
              <option value="adjustment">Adjustment</option>
              <option value="return">Return</option>
              <option value="expired">Expired (Remove Stock)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity * (use negative for reduction)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., 100 or -10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Number
            </label>
            <input
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="BATCH001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="input-field"
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Transaction
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;