'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useCart } from '../context/CartContext'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Product[]>([])
  const { addToCart, isInCart } = useCart()
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')
      .then(res => res.json())
      .then((data: Product[]) => {
        setDeals(data.map(product => ({
          ...product,
          price: product.price * 0.8 
        })))
      })
      .catch(error => {
        console.error('Error fetching deals:', error)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Hot Deals</h1>

        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Flash Sale!</h2>
            <p className="text-lg">Get 20% off on selected items</p>
          </div>
          <div className="text-center">
            <p className="text-sm mb-1">Ends in</p>
            <div className="text-3xl font-bold flex items-center">
              <Clock className="mr-2 h-6 w-6" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-[250px] group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  20% OFF
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${(product.price / 0.8).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
                  </div>
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors flex items-center justify-center"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart(product.id) ? 'View Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">&copy; 2023 eTrade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}