'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { getMessagesForUser } from '../utils/adminUtils'
import { getUserTransactions, Transaction } from '../utils/transactions'

interface Message {
  id: string;
  userId: string | 'all';
  category: 'general' | 'e-pins' | 'other';
  content: string;
  timestamp: number;
}

export default function UserDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    if (!user || user.isAdmin) {
      router.push('/account')
    } else {
      setMessages(getMessagesForUser(user.id))
      setTransactions(getUserTransactions(user.id))
    }
  }, [user, router])

  if (!user || user.isAdmin) {
    return null
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
        <p>Welcome, {user.name}!</p>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p>You have no transactions.</p>
          ) : (
            <ul className="space-y-4">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="border p-4 rounded-lg">
                  <p className="font-bold">Transaction ID: {transaction.id}</p>
                  <p>Total: ₦{transaction.total.toFixed(2)}</p>
                  <p>Status: {transaction.status}</p>
                  <p>Date: {transaction.createdAt.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
          {messages.length === 0 ? (
            <p>You have no messages.</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((message) => (
                <li key={message.id} className="border p-4 rounded-lg">
                  <p className="font-bold">{message.category.charAt(0).toUpperCase() + message.category.slice(1)}</p>
                  <p>{message.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

