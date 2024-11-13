'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../app/context/CartContext'
import CartModal from './CartModal'

export default function Navbar() {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            eTrade
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/store" className="text-gray-600 hover:text-gray-900">Store</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link href="/deals" className="text-gray-600 hover:text-gray-900">Deals</Link>
          </nav>
          
          <div className="flex items-center">
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-full"
              onClick={openCart}
              aria-label={`View cart with ${cart.length} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            
            <button 
              className="ml-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
              <Link href="/store" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Store</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About Us</Link>
              <Link href="/deals" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Deals</Link>
            </div>
          </div>
        )}
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}