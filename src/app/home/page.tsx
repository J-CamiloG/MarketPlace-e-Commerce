'use client'

import { Product } from '../../types/product'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, ArrowRight, Clock, Truck, CreditCard } from 'lucide-react'
import Navbar from '@/components/Navbar'
import CartModal from '@/components/CartModal'
import { useCart } from '../context/CartContext'
import Footer from '@/components/Footer'



export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const { addToCart, isInCart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then((data: Product[]) => {
        setFeaturedProducts(data)
      })
      .catch(error => {
        console.error('Error fetching featured products:', error)
      })
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const handleAddToCart = (product: Product) => {
    if (isInCart(product.id)) {
      openCart()
    } else {
      addToCart(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar openCart={openCart} />

      <main className="container mx-auto px-4 py-8">
        {/* hero */}
        <section className="mb-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl overflow-hidden">
          <div className="container mx-auto px-6 py-16 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AgriMarket</h1>
            <p className="text-xl mb-8">Discover amazing products at beautiful prices!</p>
            <Link href="/store" className="bg-white text-purple-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
          </div>
        </section>

        {/* seccion de Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-purple-600">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                <div className="relative h-[250px] group">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/store`} className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                      View in Store
                    </Link>
                  </div>
                </div>
                {/* descrpciones de carts  */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(3)}</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors flex items-center justify-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isInCart(product.id) ? 'View Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deals */}
        <section className="mb-16 bg-black rounded-2xl shadow-lg p-8 ">
          <h2 className="text-3xl font-bold mb-8 ">Hot Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
            <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">Summer Sale</h3>
              <p className="mb-4">Get up to 50% off on summer essentials!</p>
              <Link href="/deals" className="text-purple-600 font-semibold flex items-center hover:underline">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">New Arrivals</h3>
              <p className="mb-4">Check out our latest products!</p>
              <Link href="/deals" className="text-purple-600 font-semibold flex items-center hover:underline">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">Clearance</h3>
              <p className="mb-4">Last chance to grab these items!</p>
              <Link href="/deals" className="text-purple-600 font-semibold flex items-center hover:underline">
                View Deals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* seccion de  Features */}
        <section className="mb-16 text-black">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center">
              <Clock className="h-12 w-12 text-purple-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Get your products delivered in no time</p>
              </div>
            </div>
            <div className="flex items-center">
              <Truck className="h-12 w-12 text-purple-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-12 w-12 text-purple-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure payment methods</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>

      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}