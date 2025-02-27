'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useMessages } from '../hooks/useMessages'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendMessage } from '../utils/adminUtils'

export default function MessagesPage() {
  const { messages, markAsRead } = useMessages()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      sendMessage(user.id, 'general', newMessage, 'user')
      setNewMessage('')
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`p-4 rounded-lg ${message.read ? 'bg-gray-100' : 'bg-blue-100'}`}
              onClick={() => markAsRead(message.id)}
            >
              <p className="font-bold">{message.sender === 'admin' ? 'Admin' : 'You'}</p>
              <p>{message.content}</p>
              <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
        {user && !user.isAdmin && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
            <div className="flex space-x-2">
              <Input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type your message here..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

