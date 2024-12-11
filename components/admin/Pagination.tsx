import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
  
    // 最初の2ページ
    pages.push(1);
    if (totalPages > 1) pages.push(2);
  
    // 左側の "..." を挿入
    if (currentPage > 3) {
      pages.push("...");
    }
  
    // 現在ページ
    if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage);
    }
  
    // 右側の "..." を挿入
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
  
    // 最後の2ページ（重複を避ける）
    if (totalPages > 1 && pages[pages.length - 1] !== totalPages - 1) {
      pages.push(totalPages - 1);
    }
    if (totalPages > 2 && pages[pages.length - 1] !== totalPages) {
      pages.push(totalPages);
    }
  
    // 「...」が隣り合わないようにする
    const result: (number | string)[] = [];
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] === "..." && pages[i - 1] === "...") {
        continue;
      }
      result.push(pages[i]);
    }
  
    return result;
  };  

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`text-center rounded-full w-8 h-8 shrink-0 transition text-white mr-auto ${
          currentPage === 1 ? "bg-gray-300" : "bg-primary hover:opacity-60"
        }`}
      >
        &lt;
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage || page === "..."}
          className={`py-1 rounded ${
            page === currentPage
              ? "font-bold"
              : page === "..."
              ? "cursor-default"
              : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`text-center rounded-full w-8 h-8 shrink-0 transition text-white ml-auto ${
          currentPage === totalPages ? "bg-gray-200" : "bg-primary hover:opacity-60"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
