'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { Transaction } from '../../utils/transactions'
import { Button } from '@/components/ui/button'
import { getUploadedFiles, getUserPhoneNumbers, authorizeTransaction, getPendingTransactions } from '../../utils/admin'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{ userId: string; receiptUrl: string }[]>([])
  const [phoneNumbers, setPhoneNumbers] = useState<{ userId: string; phoneNumber: string }[]>([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.email !== 'admin@example.com') { // Replace with actual admin check
      router.push('/')
    } else {
      setTransactions(getPendingTransactions())
      setUploadedFiles(getUploadedFiles())
      setPhoneNumbers(getUserPhoneNumbers())
    }
  }, [user, router])

  const handleAuthorize = (id: string) => {
    const success = authorizeTransaction(id)
    if (success) {
      setTransactions(transactions.filter(t => t.id !== id))
    }
  }

  if (!user || user.email !== 'admin@example.com') {
    return null // or a loading spinner
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin: Manage Transactions</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Receipt</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const userPhoneNumber = phoneNumbers.find(p => p.userId === transaction.userId)?.phoneNumber
                const userReceiptUrl = uploadedFiles.find(f => f.userId === transaction.userId)?.receiptUrl
                return (
                  <tr key={transaction.id}>
                    <td className="border px-4 py-2">{transaction.id}</td>
                    <td className="border px-4 py-2">{transaction.userId}</td>
                    <td className="border px-4 py-2">₦{transaction.total.toFixed(2)}</td>
                    <td className="border px-4 py-2">{userPhoneNumber}</td>
                    <td className="border px-4 py-2">
                      {userReceiptUrl && (
                        <a href={userReceiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          View Receipt
                        </a>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <Button onClick={() => handleAuthorize(transaction.id)}>
                        Authorize
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  )
}

