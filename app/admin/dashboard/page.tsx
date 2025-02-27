"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getUploadedFiles, getUserPhoneNumbers, getPendingTransactions } from "../../utils/admin"
import {
  sendMessage,
  getAllMessages,
  type Message,
  getAllFormSubmissions,
  type FormSubmission,
} from "../../utils/adminUtils"
import { type Transaction, updateTransactionStatus } from "../../utils/transactions"

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{ userId: string; receiptUrl: string }[]>([])
  const [phoneNumbers, setPhoneNumbers] = useState<{ userId: string; phoneNumber: string }[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [userMessages, setUserMessages] = useState<Record<string, Message[]>>({})
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([])
  const { user, getAllUsers } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        router.push("/account")
      } else if (!user.isAdmin) {
        router.push("/dashboard")
      } else {
        const fetchedUsers = await getAllUsers()
        setUsers(fetchedUsers)
        setTransactions(getPendingTransactions())
        setUploadedFiles(getUploadedFiles())
        setPhoneNumbers(getUserPhoneNumbers())
        const allMessages = getAllMessages()
        const messagesByUser = allMessages.reduce(
          (acc, message) => {
            if (message.userId !== "all") {
              if (!acc[message.userId]) {
                acc[message.userId] = []
              }
              acc[message.userId].push(message)
            }
            return acc
          },
          {} as Record<string, Message[]>,
        )
        setUserMessages(messagesByUser)
        setFormSubmissions(getAllFormSubmissions())
      }
    }

    checkAdminStatus()
  }, [user, router, getAllUsers])

  const handleAuthorize = (id: string) => {
    const updatedTransaction = updateTransactionStatus(id, "completed")
    if (updatedTransaction) {
      setTransactions(transactions.filter((t) => t.id !== id))
    }
  }

  const handleDecline = (id: string) => {
    const updatedTransaction = updateTransactionStatus(id, "declined")
    if (updatedTransaction) {
      setTransactions(transactions.filter((t) => t.id !== id))
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(selectedUser, "general", message, "admin")
      setMessage("")
      alert("Message sent successfully!")
    }
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Phone Number</th>
                  <th className="px-4 py-2 border">Receipt</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const userPhoneNumber = phoneNumbers.find((p) => p.userId === transaction.userId)?.phoneNumber
                  const userReceiptUrl = uploadedFiles.find((f) => f.userId === transaction.userId)?.receiptUrl
                  return (
                    <tr key={transaction.id}>
                      <td className="border px-4 py-2">{transaction.id}</td>
                      <td className="border px-4 py-2">{transaction.userId}</td>
                      <td className="border px-4 py-2">₦{transaction.total.toFixed(2)}</td>
                      <td className="border px-4 py-2">{userPhoneNumber}</td>
                      <td className="border px-4 py-2">
                        {userReceiptUrl && (
                          <a
                            href={userReceiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Receipt
                          </a>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        <Button onClick={() => handleAuthorize(transaction.id)} className="mr-2">
                          Authorize
                        </Button>
                        <Button onClick={() => handleDecline(transaction.id)} variant="destructive">
                          Decline
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Chats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(userMessages).map(([userId, messages]) => {
              const user = users.find((u) => u.id === userId)
              return (
                <div key={userId} className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">{user ? user.name : "Unknown User"}</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded ${message.sender === "admin" ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Send Message</h2>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <select
                id="recipient"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="all">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full"
                rows={4}
                placeholder="Type your message here..."
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service Form Submissions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Service</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {formSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="border px-4 py-2">{submission.id}</td>
                    <td className="border px-4 py-2">{submission.userId}</td>
                    <td className="border px-4 py-2">{submission.service}</td>
                    <td className="border px-4 py-2">
                      <ul>
                        {Object.entries(submission.details).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">{new Date(submission.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

