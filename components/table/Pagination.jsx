"use client";

import { useState } from "react";

export default function Pagination({ totalPages = 1, setPageNumber }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (

    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        <button
          onClick={() => { handlePageChange(currentPage - 1); setPageNumber(currentPage - 1) }}
          disabled={currentPage === 1}
          className="inline-flex  bg-[#E8E8E8] items-center justify-center align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md py-1 px-2 text-stone-800 hover:bg-stone-800/5"
        >

          قبلی
        </button>
        {/* <p className="text-red-400">{totalPages}</p> */}

        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => {
                  handlePageChange(page);
                  setPageNumber(page);
                }}
                className={`inline-grid place-items-center align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in text-sm min-w-[30px] min-h-[30px] rounded-md ${currentPage === page
                    ? "shadow-sm text-[#3676B6] shadow-gray-200 bg-[#F2F5FA] text-ff"
                    : "bg-transparent text-stone-800 hover:bg-stone-800/5"
                  }`}
              >
                {page}
              </button>
            );
          })}

        <button
          onClick={() => { handlePageChange(currentPage + 1); setPageNumber(currentPage + 1) }}
          disabled={currentPage === totalPages }
          className="inline-flex  bg-gray-300 items-center justify-center align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md py-1 px-2 text-stone-800 hover:bg-stone-800/5"
        >
          بعدی
        </button>
      </div>

    </div>
  );
}