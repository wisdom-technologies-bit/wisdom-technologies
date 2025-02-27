import { getTransactions, updateTransactionStatus, Transaction } from './transactions'

export const getUploadedFiles = (): { userId: string; receiptUrl: string }[] => {
  const transactions = getTransactions()
  return transactions.map(t => ({ userId: t.userId, receiptUrl: t.receiptUrl }))
}

export const getUserPhoneNumbers = (): { userId: string; phoneNumber: string }[] => {
  const transactions = getTransactions()
  return transactions.map(t => ({ userId: t.userId, phoneNumber: t.phoneNumber }))
}

export const authorizeTransaction = (transactionId: string): boolean => {
  const updatedTransaction = updateTransactionStatus(transactionId, 'completed')
  return !!updatedTransaction
}

export const getPendingTransactions = (): Transaction[] => {
  const transactions = getTransactions()
  return transactions.filter(t => t.status === 'pending')
}

