'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from './Cart'

export function CustomProductForm({ service }: { service: string }) {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const { user } = useAuth()
  const { addToCart } = useCart()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please log in to create a custom product.')
      return
    }
    if (!productName || !productPrice) {
      alert('Please fill in all fields.')
      return
    }
    const price = parseFloat(productPrice)
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price.')
      return
    }
    addToCart({
      name: `Custom ${service}: ${productName}`,
      price: price,
      quantity: 1
    })
    alert('Custom product added to cart!')
    setProductName('')
    setProductPrice('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="productPrice">Price (₦)</Label>
        <Input
          id="productPrice"
          type="number"
          step="0.01"
          min="0"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">Add Custom Product</Button>
    </form>
  )
}

