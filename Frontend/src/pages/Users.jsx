import React, { useState, useEffect } from 'react';
import userApi from '../api/userApi'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Loader from '../components/common/Loader';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // TODO: Connect to your backend
      const response = await userApi.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // TODO: Connect to your backend
        await userApi.deleteUser(id);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      render: (row) => (
        <span className="capitalize badge badge-info">{row.role}</span>
      )
    },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge ${row.isActive ? 'badge-success' : 'badge-danger'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
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
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>Add User</span>
        </button>
      </div>

      <Card>
        <Table columns={columns} data={users} />
      </Card>
    </div>
  );
};

export default Users;