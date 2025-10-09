import React, { useState } from 'react';
import { userAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = userAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

      <Card>
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-gray-800">{user?.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold text-gray-800">{user?.address || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <button className="mt-6 btn-primary flex items-center space-x-2">
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </Card>
    </div>
  );
};

export default Profile