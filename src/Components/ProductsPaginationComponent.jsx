import { Link } from "@tanstack/react-router";

const getPagination = (current, total) => {
  const pages = [];
  if ( total <= 5 ) {
    for ( let i = 1; i <= total; i++ ) pages.push(i);
    return pages;
  }
  // Always show first
  pages.push(1);
  // Show left ellipsis if needed
  if ( current > 3 ) {
    pages.push("...");
  }
  // Show current-1, current, current+1 if in range
  for ( let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++ ) {
    if ( i !== 1 && i !== total ) {
      pages.push(i);
    }
  }
  // Show right ellipsis if needed
  if ( current < total - 2 ) {
    pages.push("...");
  }
  // Always show last
  if ( total > 1 ) {
    pages.push(total);
  }
  return pages;
};

const ProductsPaginationComponent = ({ products }) => {
  const currentPage = products.meta.current_page;
  const totalPages = products.meta.last_page;
  const pages = getPagination(currentPage, totalPages);

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className='flex flex-row gap-2'>
        {currentPage === 1 ? (
          <div className=' p-1 transition-colors opacity-50 cursor-not-allowed select-none flex items-center justify-center min-w-[40px]'>
            <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7803 5.21967C12.0732 5.51256 12.0732 5.98744 11.7803 6.28033L8.06066 10L11.7803 13.7197C12.0732 14.0126 12.0732 14.4874 11.7803 14.7803C11.4874 15.0732 11.0126 15.0732 10.7197 14.7803L6.46967 10.5303C6.17678 10.2374 6.17678 9.76256 6.46967 9.46967L10.7197 5.21967C11.0126 4.92678 11.4874 4.92678 11.7803 5.21967Z" fill="#10151F"/>
</svg>
</span> {/* ◀ */}
          </div>
        ) : (
          <Link
            to='/products'
            search={{ page: currentPage - 1 }}
            className=' p-1 transition-colors  flex items-center justify-center min-w-[40px]'
            aria-disabled={currentPage === 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7803 5.21967C12.0732 5.51256 12.0732 5.98744 11.7803 6.28033L8.06066 10L11.7803 13.7197C12.0732 14.0126 12.0732 14.4874 11.7803 14.7803C11.4874 15.0732 11.0126 15.0732 10.7197 14.7803L6.46967 10.5303C6.17678 10.2374 6.17678 9.76256 6.46967 9.46967L10.7197 5.21967C11.0126 4.92678 11.4874 4.92678 11.7803 5.21967Z" fill="#10151F"/>
            </svg>

          </Link>
        )}
        {pages.map((pageNum, idx) =>
          pageNum === "..." ? (
            <div
              key={idx}
              className='border border-gray-200 rounded p-1 cursor-default select-none flex items-center justify-center min-w-[40px]'
            >
              <span>...</span>
            </div>
          ) : (
            <Link
              key={idx}
              to='/products'
              search={{ page: pageNum }}
              aria-current={pageNum === currentPage ? "page" : undefined}
              className={`border border-gray-200 rounded p-1 transition-colors flex items-center justify-center min-w-[40px] ${
                pageNum === currentPage ? "text-red-500 border-red-500" : ""
              }`}
            >
              {pageNum}
            </Link>
          )
        )}
        {currentPage === totalPages ? (
          <div className='border border-gray-200 p-1 transition-colors opacity-50 cursor-not-allowed select-none flex items-center justify-center min-w-[40px]'>
            <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.21967 5.21967C8.51256 4.92678 8.98744 4.92678 9.28033 5.21967L13.5303 9.46967C13.8232 9.76256 13.8232 10.2374 13.5303 10.5303L9.28033 14.7803C8.98744 15.0732 8.51256 15.0732 8.21967 14.7803C7.92678 14.4874 7.92678 14.0126 8.21967 13.7197L11.9393 10L8.21967 6.28033C7.92678 5.98744 7.92678 5.51256 8.21967 5.21967Z" fill="#10151F"/>
</svg>
</span>
          </div>
        ) : (
          <Link
            to='/products'
            search={{ page: currentPage + 1 }}
            className=' p-1 transition-colors  flex items-center justify-center min-w-[40px]'
            aria-disabled={currentPage === totalPages}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.21967 5.21967C8.51256 4.92678 8.98744 4.92678 9.28033 5.21967L13.5303 9.46967C13.8232 9.76256 13.8232 10.2374 13.5303 10.5303L9.28033 14.7803C8.98744 15.0732 8.51256 15.0732 8.21967 14.7803C7.92678 14.4874 7.92678 14.0126 8.21967 13.7197L11.9393 10L8.21967 6.28033C7.92678 5.98744 7.92678 5.51256 8.21967 5.21967Z" fill="#10151F"/>
            </svg>

          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductsPaginationComponent;
