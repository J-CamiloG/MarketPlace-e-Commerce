import { ChevronDown, Search, SortAsc, SortDesc, Filter } from 'lucide-react'
import { StoreFiltersProps } from '../types/storeFiltersProps'


export default function StoreFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder
}: StoreFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 text-black">
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-full md:w-[180px] bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        >
          <span>Price</span>
          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </button>
        <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  )
}