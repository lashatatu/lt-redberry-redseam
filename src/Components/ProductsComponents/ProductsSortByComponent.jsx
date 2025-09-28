import React from "react";
import { Dialog } from "@headlessui/react";

const ProductsSortByComponent = ({
  open,
  onClose,
  onSort,
  price_from,
  price_to
}) => {
  return (
    <div className='relative'>
      <button
        className='flex items-center space-x-2 text-gray-600'
        onClick={() => onClose(!open)}
        type='button'
      >
        <span>Sort By</span>
      </button>
      <Dialog open={open} onClose={() => onClose(false)} className="fixed inset-0 z-50 flex items-start justify-end">
        <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
        <Dialog.Panel className='absolute right-28 top-54 mt-2 w-50 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4'>
          <h1 className='font-semibold py-2'>Sort By</h1>
          <div className='cursor-pointer'>
            <p className='py-2' onClick={() => { onSort('created_at', price_from, price_to); onClose(false); }}>new products first</p>
            <p className='py-2' onClick={() => { onSort('price', price_from, price_to); onClose(false); }}>price, low to high</p>
            <p className='py-2' onClick={() => { onSort('-price', price_from, price_to); onClose(false); }}>price, high to low</p>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ProductsSortByComponent;
