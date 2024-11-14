import { useCart } from '../app/context/CartContext'
import { X, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { CartModalProps } from '../types/cartModalProps'
import Link from 'next/link'



export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map(product => (
              <div key={product.id} className="flex items-center space-x-4">
                <Image src={product.image} alt={product.title} width={50} height={50} className="object-contain" />
                <div className="flex-grow">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              href="/cart" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-colors mt-4 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </Link>

          </div>
        )}
      </div>
    </div>
  )
}