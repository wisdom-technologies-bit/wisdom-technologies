'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { verifyPayment } from '../../utils/flutterwave'

interface Transaction {
  id: string
  status: string
  amount: number
  customer: {
    name: string
    email: string
    phone_number: string
  }
  created_at: string
}

export default function TransactionStatusPage({ params }: { params: { id: string } }) {
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/account')
    } else {
      const fetchTransaction = async () => {
        try {
          const response = await verifyPayment(params.id)
          if (response.status === "success") {
            setTransaction(response.data)
          } else {
            console.error("Failed to fetch transaction:", response)
            router.push('/')
          }
        } catch (error) {
          console.error("Error fetching transaction:", error)
          router.push('/')
        }
      }
      fetchTransaction()
    }
  }, [user, router, params.id])

  if (!transaction) {
    return null // or a loading spinner
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Transaction Status</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Transaction #{transaction.id}</h2>
          <p className="mb-2">Status: <span className={`font-bold ${transaction.status === 'successful' ? 'text-green-600' : 'text-yellow-600'}`}>{transaction.status}</span></p>
          <p className="mb-2">Amount: ₦{transaction.amount.toFixed(2)}</p>
          <p className="mb-2">Customer Name: {transaction.customer.name}</p>
          <p className="mb-2">Customer Email: {transaction.customer.email}</p>
          <p className="mb-2">Customer Phone: {transaction.customer.phone_number}</p>
          <p className="mb-2">Transaction Date: {new Date(transaction.created_at).toLocaleString()}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

