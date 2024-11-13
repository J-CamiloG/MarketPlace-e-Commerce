'use client'

import { useState, useEffect } from 'react'
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import StoreFilters from '@/components/StoreFilters'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const productsPerPage = 4

  useEffect(() => {
    setIsLoading(true)
    fetch('https://fakestoreapi.com/products?limit=12')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data)
        setFilteredProducts(data)
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)))
        setCategories(['all', ...uniqueCategories])
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    let result = [...products]
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory)
    }
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price)
    setFilteredProducts(result)
    setCurrentPage(1)
  }, [selectedCategory, sortOrder, searchTerm, products])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const openCart = () => {
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <StoreFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} openCart={openCart} />
              ))}
            </div>

            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found. Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  )
}