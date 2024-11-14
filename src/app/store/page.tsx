'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader } from 'lucide-react'
import Navbar from '@/components/Navbar'
import StoreFilters from '@/components/StoreFilters'
import ProductCard from '@/components/ProductCard'
import CartModal from '@/components/CartModal'
import Pagination from '@/components/Pagination'
import { Product } from '../../types/product'


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

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar openCart={openCart} />

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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found. Try adjusting your search or filters.</p>
          </div>
        )}
      </main>


      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}