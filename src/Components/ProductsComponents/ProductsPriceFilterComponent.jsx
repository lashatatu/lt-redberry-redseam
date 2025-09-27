import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const ProductsPriceFilterComponent = ({filterRef,showFilter,onToggle,onSort,sort,price_from,price_to}) => {
  const [priceFrom, setPriceFrom] = useState(price_from || "");
  const [priceTo, setPriceTo] = useState(price_to || "");
  return (
    <div className='relative' ref={filterRef}>
      <button
        className='flex items-center space-x-2 text-gray-600'
        onClick={onToggle}
        type='button'
      >
        <HiOutlineAdjustmentsHorizontal size={20} from={'black'}/>
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

export default ProductsPriceFilterComponent;
