'use client'

import Image from 'next/image'
import { useCart } from '../context/CartContext'
import Navbar from '@/components/Navbar'
import { Minus, Plus, X } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            {cart.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                <div className="flex-shrink-0 w-24 h-24 relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">${product.price.toFixed(3)} each</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.id, Math.max(1, (product.quantity ?? 1) - 1))}
                      className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity !== undefined ? product.quantity + 1 : 1)}
                      className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                <p className="text-xl font-bold mb-2">
                  ${((product.price * (product.quantity ?? 1)).toFixed(3))}
                </p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label={`Remove ${product.title} from cart`}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(3)}</span>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}