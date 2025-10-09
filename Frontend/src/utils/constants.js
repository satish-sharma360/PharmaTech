export const ROLES = {
  ADMIN: 'admin',
  PHARMACIST: 'pharmacist',
  CASHIER: 'cashier',
};

export const PRESCRIPTION_STATUS = {
  PENDING: 'pending',
  DISPENSED: 'dispensed',
  EXPIRED: 'expired',
};

export const SALE_STATUS = {
  COMPLETED: 'completed',
  RETURNED: 'returned',
  EXCHANGED: 'exchanged',
};

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi',
  OTHER: 'other',
};

export const TRANSACTION_TYPES = {
  PURCHASE: 'purchase',
  SALE: 'sale',
  RETURN: 'return',
  ADJUSTMENT: 'adjustment',
  EXPIRED: 'expired',
};

export const REPORT_TYPES = {
  DAILY_SALES: 'daily-sales',
  INVENTORY: 'inventory',
  PRESCRIPTION: 'prescription',
  FINANCIAL: 'financial',
  CUSTOMER: 'customer',
  EXPIRY: 'expiry',
};