export type StoreFiltersProps = {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (order: 'asc' | 'desc') => void
}