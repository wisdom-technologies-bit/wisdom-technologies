import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
  id: string;
  userId: string;
  items: { name: string; price: number }[];
  total: number;
  phoneNumber: string;
  receiptUrl: string;
  status: 'pending' | 'completed' | 'declined';
  createdAt: Date;
}

let transactions: Transaction[] = [];

export const createTransaction = (
  userId: string,
  items: { name: string; price: number }[],
  total: number,
  phoneNumber: string,
  receiptUrl: string
): Transaction => {
  const transaction: Transaction = {
    id: uuidv4(),
    userId,
    items,
    total,
    phoneNumber,
    receiptUrl,
    status: 'pending',
    createdAt: new Date(),
  };
  transactions.push(transaction);
  return transaction;
};

export const getTransactions = (): Transaction[] => {
  return transactions;
};

export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find(t => t.id === id);
};

export const updateTransactionStatus = (id: string, status: 'pending' | 'completed' | 'declined'): Transaction | undefined => {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    transaction.status = status;
  }
  return transaction;
};

export const getUserTransactions = (userId: string): Transaction[] => {
  return transactions.filter(t => t.userId === userId);
};

