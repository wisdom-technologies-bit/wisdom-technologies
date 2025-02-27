import { v4 as uuidv4 } from 'uuid';
import { getTransactions, updateTransactionStatus, Transaction } from './transactions'

export interface Message {
  id: string;
  userId: string | 'all';
  category: 'general' | 'e-pins' | 'other';
  content: string;
  timestamp: number;
  read: boolean;
  sender: 'admin' | 'user';
}

export interface FormSubmission {
  id: string;
  userId: string;
  service: string;
  details: Record<string, string>;
  timestamp: number;
}

let messages: Message[] = [];
let formSubmissions: FormSubmission[] = [];

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

export const sendMessage = (userId: string | 'all', category: 'general' | 'e-pins' | 'other', content: string, sender: 'admin' | 'user'): Message => {
  const newMessage: Message = {
    id: uuidv4(),
    userId,
    category,
    content,
    timestamp: Date.now(),
    read: false,
    sender,
  };
  messages.push(newMessage);
  return newMessage;
};

export const getMessagesForUser = (userId: string): Message[] => {
  return messages.filter(m => m.userId === userId || m.userId === 'all');
};

export const getAllMessages = (): Message[] => {
  return messages;
};

export const markMessageAsRead = (messageId: string): void => {
  const message = messages.find(m => m.id === messageId);
  if (message) {
    message.read = true;
  }
};

export const submitForm = (userId: string, service: string, details: Record<string, string>): FormSubmission => {
  const newSubmission: FormSubmission = {
    id: uuidv4(),
    userId,
    service,
    details,
    timestamp: Date.now(),
  };
  formSubmissions.push(newSubmission);
  return newSubmission;
};

export const submitServiceForm = async (userId: string, service: string, details: Record<string, string>): Promise<FormSubmission> => {
  const newSubmission: FormSubmission = {
    id: uuidv4(),
    userId,
    service,
    details,
    timestamp: Date.now(),
  };
  formSubmissions.push(newSubmission);
  return newSubmission;
};

export const getAllFormSubmissions = (): FormSubmission[] => {
  return formSubmissions;
};

