'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getAllMessages, markMessageAsRead, Message } from '../utils/adminUtils'

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const { user } = useAuth()

  const fetchMessages = useCallback(() => {
    if (user) {
      const allMessages = getAllMessages()
      const userMessages = allMessages.filter(m => m.userId === user.id || m.userId === 'all')
      setMessages(userMessages)
      setHasNewMessages(userMessages.some(m => !m.read))
    }
  }, [user])

  useEffect(() => {
    fetchMessages()
    const intervalId = setInterval(fetchMessages, 60000)
    return () => clearInterval(intervalId)
  }, [fetchMessages])

  const markAsRead = useCallback((messageId: string) => {
    markMessageAsRead(messageId)
    setMessages(prevMessages => 
      prevMessages.map(m => 
        m.id === messageId ? { ...m, read: true } : m
      )
    )
    setHasNewMessages(prevMessages => 
      prevMessages.some(m => m.id !== messageId && !m.read)
    )
  }, [])

  return { messages, hasNewMessages, markAsRead, fetchMessages }
}

