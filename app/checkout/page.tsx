"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "../contexts/AuthContext"
import type { CartItem } from "../components/Cart"
import { Plus, Minus } from "lucide-react"
import { useCart } from "../components/Cart"
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3"
import { flutterwaveConfig, initializePayment, verifyPayment } from "../utils/flutterwave"

export default function CheckoutPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const { clearCart } = useCart()
  const [paymentConfig, setPaymentConfig] = useState(flutterwaveConfig)

  useEffect(() => {
    if (!user) {
      router.push("/account")
    } else {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [user, router])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.name !== itemName))
    } else {
      setCartItems(cartItems.map((item) => (item.name === itemName ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const handlePaymentSuccess = async (response: any) => {
    closePaymentModal()
    if (response.status === "successful") {
      try {
        const verificationResponse = await verifyPayment(response.transaction_id)
        if (verificationResponse.status === "success") {
          clearCart()
          router.push(`/transaction/${response.transaction_id}`)
        } else {
          alert("Payment verification failed. Please contact support.")
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
        alert("An error occurred while verifying your payment. Please contact support.")
      }
    }
  }

  useEffect(() => {
    console.log("Phone number state updated:", phoneNumber)
  }, [phoneNumber])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    console.log("Formatted phone number:", formatted)
    setPhoneNumber(formatted)
  }

  useEffect(() => {
    if (user) {
      initializePayment(calculateTotal(), user.email, user.name, phoneNumber).then(setPaymentConfig)
    }
  }, [user, phoneNumber, cartItems, calculateTotal]) // Added calculateTotal to dependencies

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const cleaned = input.replace(/\D/g, "")

    // Format the number
    let formatted = cleaned
    if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    }
    if (cleaned.length > 6) {
      formatted = `${formatted.slice(0, 7)}-${formatted.slice(7, 11)}`
    }

    return formatted
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span>₦{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
                <li className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₦{calculateTotal().toFixed(2)}</span>
                </li>
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
              </div>
              <FlutterWaveButton
                {...paymentConfig}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                callback={handlePaymentSuccess}
                onClose={() => {}}
                text="Pay Now"
              />
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

