import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../app/context/CartContext'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

type ProductCardProps = {
  product: Product
  openCart: () => void
}

export default function ProductCard({ product, openCart }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      openCart()
    } else {
      addToCart(product)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-[250px] group">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Quick View
          </button>
        </div>
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
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
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isInCart(product.id) ? 'View Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}