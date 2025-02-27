"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"

export interface CartItem {
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (itemName: string, newQuantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    }
  }, [user])

  const addToCart = (item: CartItem) => {
    if (user) {
      setItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.name === item.name)
        if (existingItem) {
          return prevItems.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
        } else {
          return [...prevItems, item]
        }
      })
    }
  }

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (user) {
      setItems((prevItems) => {
        if (newQuantity === 0) {
          return prevItems.filter((item) => item.name !== itemName)
        } else {
          return prevItems.map((item) => (item.name === itemName ? { ...item, quantity: newQuantity } : item))
        }
      })
    }
  }

  const clearCart = () => {
    if (user) {
      setItems([])
    }
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items))
    }
  }, [user, items])

  return <CartContext.Provider value={{ items, addToCart, updateQuantity, clearCart }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function Cart({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { items, updateQuantity, clearCart } = useCart()

  const handleCartClick = () => {
    if (user) {
      setIsOpen(!isOpen)
    } else {
      router.push("/account")
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="relative">
      <Button variant="ghost" size={size} className="px-2 py-1" onClick={handleCartClick}>
        <ShoppingCart className={size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5"} />
        <span className={`ml-2 ${size === "sm" ? "text-xs" : "text-sm"}`}>{totalItems}</span>
      </Button>
      {user && isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 text-gray-900">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            {items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul className="max-h-60 overflow-auto mb-4">
                  {items.map((item, index) => (
                    <li key={index} className="mb-2 pb-2 border-b last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{item.name}</span>
                        <span>₦{item.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-medium">₦{item.price * item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 mb-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₦{totalPrice}</span>
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Link href="/checkout" className="block">
                <Button className="w-full">Checkout</Button>
              </Link>
              {items.length > 0 && (
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

