'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  isInCart: (productId: number) => boolean
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
      if (!prevCart.some(item => item.id === product.id)) {
        return [...prevCart, product]
      }
      return prevCart
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (productId: number) => {
    return cart.some(item => item.id === productId)
  }

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, cartTotal }}>
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