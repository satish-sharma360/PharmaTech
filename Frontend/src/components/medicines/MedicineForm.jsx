import React, { useState, useEffect } from 'react';
import {userAuth } from '../../hooks/useAuth';
import medicineApi from '../../api/medicineApi';

const MedicineForm = ({ medicine, onClose, onSuccess }) => {
  const { user } = userAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: '',
    manufacturer: '',
    description: '',
    price: '',
    stock: '',
    lowStockAlert: '',
    expiryDate: '',
    batchNumber: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || '',
        genericName: medicine.genericName || '',
        category: medicine.category || '',
        manufacturer: medicine.manufacturer || '',
        description: medicine.description || '',
        price: medicine.price || '',
        stock: medicine.stock || '',
        lowStockAlert: medicine.lowStockAlert || '',
        expiryDate: medicine.expiryDate ? medicine.expiryDate.split('T')[0] : '',
        batchNumber: medicine.batchNumber || '',
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (medicine) {
        // Update existing medicine
        // TODO: Connect to backend
        await medicineApi.updateMedicine(medicine._id, submitData);
        alert('Medicine updated successfully!');
      } else {
        // Create new medicine
        // TODO: Connect to backend
        await medicineApi.createMedicine(submitData);
        alert('Medicine added successfully!');
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving medicine:', error);
      alert(error.response?.data?.message || 'Failed to save medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Medicine Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medicine Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Paracetamol 500mg"
          />
        </div>

        {/* Generic Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generic Name
          </label>
          <input
            type="text"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Acetaminophen"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="e.g., Pain Relief"
          />
        </div>

        {/* Manufacturer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manufacturer
          </label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Sun Pharma"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="input-field"
            placeholder="50.00"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="input-field"
            placeholder="100"
          />
        </div>

        {/* Low Stock Alert */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Low Stock Alert Level *
          </label>
          <input
            type="number"
            name="lowStockAlert"
            value={formData.lowStockAlert}
            onChange={handleChange}
            required
            min="0"
            className="input-field"
            placeholder="20"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Batch Number */}
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medicine Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          {medicine?.image?.url && (
            <img
              src={medicine.image.url}
              alt={medicine.name}
              className="mt-2 h-20 w-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Enter medicine description..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : medicine ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </div>
    </form>
  );
};

export default MedicineForm;
