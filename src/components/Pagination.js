import React from "react";  

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {  
  const totalPages = Math.ceil(totalItems / itemsPerPage);  

  const getPageNumbers = () => {  
    const pages = [];  
    const maxVisiblePages = 3; // Количество видимых страниц рядом с текущей  

    pages.push(1); // Всегда показываем первую страницу  

    if (currentPage > maxVisiblePages + 1) {  
      pages.push("...");  
    }  

    for (  
      let i = Math.max(2, currentPage - maxVisiblePages);  
      i <= Math.min(totalPages - 1, currentPage + maxVisiblePages);  
      i++  
    ) {  
      pages.push(i);  
    }  

    if (currentPage < totalPages - maxVisiblePages) {  
      pages.push("...");  
    }  

    if (totalPages > 1) {  
      pages.push(totalPages); // Всегда показываем последнюю страницу  
    }  

    return pages;  
  };  

  const pageNumbers = getPageNumbers();  

  return (  
    <div className="flex justify-center items-center mt-4">  
      {pageNumbers.map((page, index) => (  
        <button  
          key={index}  
          onClick={() => typeof page === "number" && onPageChange(page)}  
          className={`mx-1 px-3 py-1 border rounded ${  
            currentPage === page  
              ? "bg-blue-500 text-white"  
              : "border-gray-400 text-blue-500"  
          } ${page === "..." ? "cursor-default" : "hover:bg-blue-100"}`}  
          disabled={page === "..."}  
        >  
          {page}  
        </button>  
      ))}  
    </div>  
  );  
};  

export default Pagination;