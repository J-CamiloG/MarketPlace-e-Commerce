import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        className="p-2 border rounded-md hover:bg-gray-100  disabled:cursor-not-allowed bg-black"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-gray-600">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="p-2 border rounded-md hover:bg-gray-100  disabled:cursor-not-allowed bg-black"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}