import React, { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Dialog } from "@headlessui/react";

const ProductsPriceFilterComponent = ({
  open,
  onClose,
  onSort,
  sort,
  price_from,
  price_to
}) => {
  const [priceFrom, setPriceFrom] = useState(price_from || "");
  const [priceTo, setPriceTo] = useState(price_to || "");
  return (
    <div className='relative'>
      <button
        className='flex items-center space-x-2 text-gray-600'
        onClick={() => onClose( !open)}
        type='button'
      >
        <HiOutlineAdjustmentsHorizontal size={20} from={"black"} />
        <span>filter</span>
      </button>
      <Dialog open={open} onClose={() => onClose(false)} className='fixed inset-0 z-50 flex items-start justify-end'>
        <div className='fixed inset-0 bg-black/10' aria-hidden='true' />
        <Dialog.Panel className='absolute w-100 right-28 top-54 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4'>
          <span className='block font-semibold text-lg text-gray-900 mb-2'>Select price</span>
          <div className='flex space-x-2 mb-2'>
            <input
              placeholder='From *'
              className='w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm'
              value={priceFrom}
              onChange={e => setPriceFrom(e.target.value)}
            />
            <input
              placeholder='To *'
              className='w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm'
              value={priceTo}
              onChange={e => setPriceTo(e.target.value)}
            />
          </div>
          <button
            className='bg-orange-600 text-white py-2 px-10 rounded-md font-medium mt-2 transition-colors hover:bg-orange-700 cursor-pointer float-right'
            onClick={() => onSort(sort, priceFrom, priceTo)}
          >
            Apply
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ProductsPriceFilterComponent;
