'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { getUserTransactions, Transaction } from '../utils/transactions'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/account')
    } else {
      setTransactions(getUserTransactions(user.id))
    }
  }, [user, router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'
      case 'completed':
        return 'text-green-500'
      case 'declined':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Transactions</h1>
        {transactions.length === 0 ? (
          <p>You have no transactions.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="border px-4 py-2">{transaction.id}</td>
                    <td className="border px-4 py-2">₦{transaction.total.toFixed(2)}</td>
                    <td className={`border px-4 py-2 ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </td>
                    <td className="border px-4 py-2">{new Date(transaction.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

