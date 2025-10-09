import React from 'react';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

const RecentSales = ({ sales }) => {
  return (
    <div className="space-y-3">
      {sales.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent sales</p>
      ) : (
        sales.map((sale) => (
          <div
            key={sale._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{sale.invoiceNumber}</p>
              <p className="text-sm text-gray-600">
                {sale.patient?.name || 'Walk-in Customer'}
              </p>
              <p className="text-xs text-gray-500">{formatDateTime(sale.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(sale.finalAmount)}
              </p>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
                {sale.paymentMethod}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentSales;