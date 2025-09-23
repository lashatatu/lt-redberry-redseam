import React from "react";

const ProductsSortByComponent = ({
  showSortBy,
  sortByRef,
  onToggle,
  onSort,
  price_from,
  price_to
}) => {
  return (
    <div className='relative' ref={sortByRef}>
      <button
        className='flex items-center space-x-2 text-gray-600'
        onClick={onToggle}
        type='button'
      >
        <span>Sort By</span>
      </button>
      {showSortBy && (
        <div className='absolute right-0 mt-2 w-50 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4'>
          <h1 className='font-semibold py-2'>Sort By</h1>
          <div className='cursor-pointer'>
            <p className='py-2' onClick={() => onSort('created_at', price_from, price_to)}>new products first</p>
            <p className='py-2' onClick={() => onSort('price', price_from, price_to)}>price, low to high</p>
            <p className='py-2' onClick={() => onSort('-price', price_from, price_to)}>price, high to low</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSortByComponent;
