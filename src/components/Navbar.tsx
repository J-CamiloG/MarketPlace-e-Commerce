'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../app/context/CartContext'
import { NavbarProps } from '../types/navbarProps'


export default function Navbar({ openCart }: NavbarProps) {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black  shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          AgriMarket
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-white font-bold hover:text-purple-400">Home</Link>
            <Link href="/store" className="text-whitw font-bold hover:text-purple-400">Store</Link>
            <Link href="/about" className="text-whitw font-bold hover:text-purple-400">About Us</Link>
            <Link href="/deals" className="text-whitw font-bold hover:text-purple-400">Deals</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 text-white hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-full"
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
            
            <Link 
              href="/cart" 
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <button 
              className="md:hidden"
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
    </header>
  )
}