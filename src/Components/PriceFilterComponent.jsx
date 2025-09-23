import { useState } from "react";

const PriceFilterComponent = ({filterRef,showFilter,onToggle,onSort,sort,price_from,price_to}) => {
  const [priceFrom, setPriceFrom] = useState(price_from || "");
  const [priceTo, setPriceTo] = useState(price_to || "");
  return (
    <div className='relative' ref={filterRef}>
      <button
        className='flex items-center space-x-2 text-gray-600'
        onClick={onToggle}
        type='button'
      >
        <svg width='20' height='20' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10.5 6.5L20.25 6.5M10.5 6.5C10.5 7.32843 9.82843 8 9 8C8.17157 8 7.5 7.32843 7.5 6.5M10.5 6.5C10.5 5.67157 9.82843 5 9 5C8.17157 5 7.5 5.67157 7.5 6.5M3.75 6.5H7.5M10.5 18.5H20.25M10.5 18.5C10.5 19.3284 9.82843 20 9 20C8.17157 20 7.5 19.3284 7.5 18.5M10.5 18.5C10.5 17.6716 9.82843 17 9 17C8.17157 17 7.5 17.6716 7.5 18.5M3.75 18.5L7.5 18.5M16.5 12.5L20.25 12.5M16.5 12.5C16.5 13.3284 15.8284 14 15 14C14.1716 14 13.5 13.3284 13.5 12.5M16.5 12.5C16.5 11.6716 15.8284 11 15 11C14.1716 11 13.5 11.6716 13.5 12.5M3.75 12.5H13.5'
            stroke='#0F172A'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round' />
        </svg>
        <span>filter</span>
      </button>
      {showFilter && (
        <div className="absolute right-0 mt-2 w-100 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4" >
          <div className="mb-4">
            <span className="block font-semibold text-lg text-gray-900 mb-2">Select price</span>
            <div className="flex space-x-2 mb-2">
              <input
                placeholder="From *"
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={priceFrom}
                onChange={e => setPriceFrom(e.target.value)}
              />
              <input
                placeholder="To *"
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={priceTo}
                onChange={e => setPriceTo(e.target.value)}
              />
            </div>
            <button
              className="bg-orange-600 text-white py-2 px-10 rounded-md font-medium mt-2 transition-colors hover:bg-orange-700 cursor-pointer float-right"
              onClick={() => onSort(sort, priceFrom, priceTo)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilterComponent;
