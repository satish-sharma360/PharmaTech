import React, { useState, useEffect } from 'react';
import medicineApi from '../../api/medicineApi';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ROLES } from '../../utils/constants';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { userAuth } from '../../hooks/useAuth';
import Modal from '../common/Modal';
import MedicineForm from './MedicineForm';

const Medicines = () => {
  const { hasRole } = userAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const canModify = hasRole([ROLES.ADMIN, ROLES.PHARMACIST]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      // TODO: Connect to your backend
      const response = await medicineApi.getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        // TODO: Connect to your backend
        await medicineApi.deleteMedicine(id);
        alert('Medicine deleted successfully');
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
        alert('Failed to delete medicine');
      }
    }
  };

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMedicine(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleSuccess = () => {
    fetchMedicines();
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', render: (row) => formatCurrency(row.price) },
    { 
      header: 'Stock', 
      render: (row) => (
        <span className={row.stock <= row.lowStockAlert ? 'text-red-600 font-bold' : ''}>
          {row.stock}
        </span>
      )
    },
    { header: 'Expiry Date', render: (row) => formatDate(row.expiryDate) },
    {
      header: 'Actions',
      render: (row) => canModify && (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Medicines</h1>
        {canModify && (
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Medicine</span>
          </button>
        )}
      </div>

      <Card>
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search medicines..."
          />
        </div>
        <Table columns={columns} data={medicines} />
      </Card>

      {/* Add/Edit Medicine Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedMedicine ? 'Edit Medicine' : 'Add New Medicine'}
        size="large"
      >
        <MedicineForm
          medicine={selectedMedicine}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default Medicines;