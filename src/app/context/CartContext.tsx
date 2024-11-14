'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/types/product'

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  isInCart: (id: number) => boolean
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id)
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    )
  }

  const isInCart = (id: number) => {
    return cart.some(item => item.id === id)
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1), // Usa 1 si quantity es undefined
    0
  )

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isInCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}