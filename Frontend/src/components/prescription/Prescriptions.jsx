import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import prescriptionApi from '../../api/prescriptionApi';
import Modal from '../../components/common/Modal'; // assuming you have this
import Loader from '../../components/common/Loader'; // assuming you have this
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { userAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import Table from '../common/Table';

const Prescriptions = () => {
  const {hasRole} = userAuth()
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    medicine: '',
    dosage: '',
    notes: '',
  });
const canModify = hasRole([ROLES.ADMIN, ROLES.PHARMACIST]);
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const data = await prescriptionApi.getAllPrescriptions();
      console.log(data.data)
      setPrescriptions(data.data);
    } catch (error) {
      console.error('Failed to fetch prescriptions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    console.log(prescriptions)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await prescriptionApi.createPrescription(formData);
      setIsModalOpen(false);
      setFormData({
        patientName: '',
        medicine: '',
        dosage: '',
        notes: '',
      });
      fetchPrescriptions();
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Failed to create prescription');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;
    try {
      await prescriptionApi.deletePrescription(id);
      fetchPrescriptions();
    } catch (error) {
      console.error('Failed to delete prescription:', error);
    }
  };
  const handleAdd = () => {
    alert('Hello')
  };

 const columns = [
  {
    header: 'Patient',
    render: (row) => row.patient?.name || 'N/A',
  },
  {
    header: 'Medicine',
    render: (row) =>
      row.medicines?.map((m, idx) => (
        <div key={idx}>{m.medicine?.name || 'N/A'}</div>
      )),
  },
  {
    header: 'Dosage',
    render: (row) =>
      row.medicines?.map((m, idx) => (
        <div key={idx}>{m.dosage || 'N/A'}</div>
      )),
  },
  {
    header: 'Prescription Date',
    render: (row) =>
      row.prescriptionDate
        ? new Date(row.prescriptionDate).toLocaleDateString()
        : 'N/A',
  },
  {
    header: 'Notes',
    render: (row) => row.notes || 'N/A',
  },
  {
    header: 'Actions',
    render: (row) => (
      <div className="flex space-x-2">
        {canModify && (
          <>
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
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Patient</span>
          </button>
        )}
      </div>

      <Card>
        <div className="mb-4">
          {/* <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients..."
          /> */}
        </div>
        <Table columns={columns} data={prescriptions} />
      </Card>

      {/* Add/Edit Patient Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        size="large"
      >
        <PatientForm
          patient={selectedPatient}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      </Modal> */}
    </div>
  );
};

export default Prescriptions;
