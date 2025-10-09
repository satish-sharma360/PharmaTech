import React, { useState, useEffect } from 'react';
import medicineApi from '../api/medicineApi';
import patientApi from '../api/patientApi';
import saleApi from '../api/saleApi';
import Card from '../components/common/Card';
import { FaSearch, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { formatCurrency } from '../utils/helpers';

const POS = () => {
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    fetchMedicines();
    fetchPatients();
  }, []);

  const fetchMedicines = async () => {
    try {
      // TODO: Connect to your backend
      const response = await medicineApi.getAllMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      // TODO: Connect to your backend
      const response = await patientApi.getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.medicine._id === medicine._id);
    
    if (existingItem) {
      if (existingItem.quantity < medicine.stock) {
        setCart(cart.map(item =>
          item.medicine._id === medicine._id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
            : item
        ));
      } else {
        alert('Not enough stock available');
      }
    } else {
      setCart([...cart, {
        medicine: medicine,
        quantity: 1,
        price: medicine.price,
        subtotal: medicine.price
      }]);
    }
  };

  const updateQuantity = (medicineId, newQuantity) => {
    const item = cart.find(i => i.medicine._id === medicineId);
    
    if (newQuantity > item.medicine.stock) {
      alert('Not enough stock');
      return;
    }

    if (newQuantity < 1) {
      removeFromCart(medicineId);
      return;
    }

    setCart(cart.map(item =>
      item.medicine._id === medicineId
        ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
        : item
    ));
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.medicine._id !== medicineId));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    const saleData = {
      patient: selectedPatient || undefined,
      items: cart.map(item => ({
        medicine: item.medicine._id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.subtotal, 0),
      discount: discount,
      finalAmount: calculateTotal(),
      paymentMethod: paymentMethod,
      saleType: selectedPatient ? 'prescription' : 'quick'
    };

    try {
      // TODO: Connect to your backend
      await saleApi.createSale(saleData);
      alert('Sale completed successfully!');
      setCart([]);
      setSelectedPatient('');
      setDiscount(0);
    } catch (error) {
      console.error('Error completing sale:', error);
      alert('Failed to complete sale');
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Medicine List */}
      <div className="lg:col-span-2 space-y-4">
        <Card title="Select Medicines">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
            {filteredMedicines.map((medicine) => (
              <div
                key={medicine._id}
                onClick={() => addToCart(medicine)}
                className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition"
              >
                <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                <p className="text-sm text-gray-600">{medicine.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(medicine.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {medicine.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cart */}
      <div className="space-y-4">
        <Card title="Cart">
          {/* Patient Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient (Optional)
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="input-field"
            >
              <option value="">Walk-in Customer</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name} - {patient.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Items */}
          <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.medicine._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.medicine.name}</p>
                    <p className="text-xs text-gray-600">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.medicine._id, item.quantity + 1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.medicine._id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="input-field"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="input-field"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">
                {formatCurrency(cart.reduce((sum, item) => sum + item.subtotal, 0))}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Discount:</span>
              <span className="font-semibold text-red-600">
                -{formatCurrency((cart.reduce((sum, item) => sum + item.subtotal, 0) * discount) / 100)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full btn-success mt-4 flex items-center justify-center space-x-2 disabled:bg-gray-300"
          >
            <FaShoppingCart />
            <span>Complete Sale</span>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default POS;