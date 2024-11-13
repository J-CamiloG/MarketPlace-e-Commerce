import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="mt-8 flex justify-center items-center space-x-4">
    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 border rounded-md">
      <ChevronLeft />
    </button>
    <span>Página {currentPage} de {totalPages}</span>
    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border rounded-md">
      <ChevronRight />
    </button>
  </div>
);

export default Pagination;
