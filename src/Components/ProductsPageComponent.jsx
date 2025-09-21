import React from "react";
import { Link } from "@tanstack/react-router";

const ProductsPageComponent = ({ products }) => {
  return (
    <div className='px-28'>
      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-2 text-gray-600'>
            <svg
              width='15'
              height='15'
              viewBox='0 0 18 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M7.5 2.5L17.25 2.5M7.5 2.5C7.5 3.32843 6.82843 4 6 4C5.17157 4 4.5 3.32843 4.5 2.5M7.5 2.5C7.5 1.67157 6.82843 1 6 1C5.17157 1 4.5 1.67157 4.5 2.5M0.750001 2.5H4.5M7.5 14.5H17.25M7.5 14.5C7.5 15.3284 6.82843 16 6 16C5.17157 16 4.5 15.3284 4.5 14.5M7.5 14.5C7.5 13.6716 6.82843 13 6 13C5.17157 13 4.5 13.6716 4.5 14.5M0.75 14.5L4.5 14.5M13.5 8.5L17.25 8.5M13.5 8.5C13.5 9.32843 12.8284 10 12 10C11.1716 10 10.5 9.32843 10.5 8.5M13.5 8.5C13.5 7.67157 12.8284 7 12 7C11.1716 7 10.5 7.67157 10.5 8.5M0.75 8.5H10.5'
                stroke='#0F172A'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round' />
            </svg>
            <span>filter</span>
          </button>
          <button>sort by</button>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {products.data.map((item) => (
          <Link to={`../product/${item.id}`}>
            <div key={item.id} className='pb-12'>
              <img src={item.cover_image} alt='' className=' w-100 pb-4' />
              <div className='font-semibold'>
                <p className='pb-4'>{item.name}</p>
                <p>$ {item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPageComponent;
