'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, User, MessageCircle } from 'lucide-react'
import { Cart } from './Cart'
import { Button } from '@/components/ui/button'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../hooks/useMessages'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { hasNewMessages, fetchMessages } = useMessages()
  const router = useRouter()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleProfileClick = useCallback(() => {
    closeMenu()
    router.push('/profile')
  }, [closeMenu, router])

  const handleLogout = useCallback(() => {
    logout()
    closeMenu()
  }, [logout, closeMenu])

  const menuItems = useMemo(() => [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    ...(user ? [
      { href: '/transactions', label: 'Transactions' },
      { href: '/messages', label: 'Messages', highlight: hasNewMessages },
      { onClick: handleProfileClick, label: 'Profile' },
      ...(user.isAdmin ? [{ href: '/admin/dashboard', label: 'Admin Dashboard' }] : []),
      { onClick: handleLogout, label: 'Logout' }
    ] : [])
  ], [user, hasNewMessages, handleProfileClick, handleLogout])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">WISDOM TECHNOLOGIES</Link>
        <nav className={`
          ${isMenuOpen ? 'block' : 'hidden'} md:flex
          flex-col md:flex-row
          fixed md:relative top-0 left-0
          w-64 md:w-auto h-screen md:h-auto
          bg-gray-800 md:bg-transparent
          p-4 md:p-0
          space-y-2 md:space-y-0 md:space-x-4
          text-sm
          transition-all duration-300 ease-in-out
          z-50
          shadow-lg md:shadow-none
        `}>
          {menuItems.map((item, index) => (
            item.href ? (
              <Link 
                key={index}
                href={item.href} 
                className={`block py-1 px-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300 rounded ${item.highlight ? 'text-yellow-300' : ''}`} 
                onClick={closeMenu}
              >
                {item.label}
                {item.highlight && <span className="ml-1 text-xs bg-yellow-500 text-black rounded-full px-1">New</span>}
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="block w-full text-left py-1 px-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300 rounded"
              >
                {item.label}
              </button>
            )
          ))}
        </nav>
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={closeMenu}
          />
        )}
        <div className="flex items-center space-x-4">
          <Cart size="sm" />
          {user ? (
            <Link href="/messages">
              <Button variant="ghost" size="sm" className={`px-2 py-1 ${hasNewMessages ? 'text-yellow-300' : ''}`}>
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
            </Link>
          ) : (
            <Link href="/account">
              <Button variant="ghost" size="sm" className="px-2 py-1">
                <User className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="sm" className="md:hidden px-2 py-1" onClick={toggleMenu}>
            <Menu className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

