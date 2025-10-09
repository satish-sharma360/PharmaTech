import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const LowStockAlert = ({ medicines }) => {
  return (
    <div className="space-y-3">
      {medicines.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">All medicines are well stocked! 🎉</p>
        </div>
      ) : (
        medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="flex items-center justify-between p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle className="text-orange-600" size={20} />
              <div>
                <p className="font-semibold text-gray-800">{medicine.name}</p>
                <p className="text-sm text-gray-600">{medicine.category}</p>
                <p className="text-xs text-gray-500">
                  Alert at: {medicine.lowStockAlert} units
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">
                {medicine.stock}
              </p>
              <p className="text-xs text-gray-500">units left</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LowStockAlert;