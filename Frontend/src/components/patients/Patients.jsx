import React, { useState, useEffect } from 'react';
import patientApi from '../../api/patientApi';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { ROLES } from '../../utils/constants';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import { userAuth } from '../../hooks/useAuth';

const Patients = () => {
  const { hasRole } = userAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const canModify = hasRole([ROLES.ADMIN, ROLES.PHARMACIST]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // TODO: Connect to your backend
      const response = await patientApi.getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        // TODO: Connect to your backend
        await patientApi.deletePatient(id);
        alert('Patient deleted successfully');
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { 
      header: 'Gender', 
      render: (row) => (
        <span className="capitalize">{row.gender}</span>
      )
    },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button className="text-green-600 hover:text-green-800">
            <FaEye />
          </button>
          {canModify && (
            <>
              <button className="text-blue-600 hover:text-blue-800">
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(row._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        {canModify && (
          <button className="btn-primary flex items-center space-x-2">
            <FaPlus />
            <span>Add Patient</span>
          </button>
        )}
      </div>

      <Card>
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients..."
          />
        </div>
        <Table columns={columns} data={patients} />
      </Card>
    </div>
  );
};

export default Patients;