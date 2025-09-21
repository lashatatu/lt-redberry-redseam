import React from "react";
import { Link } from "@tanstack/react-router";

const ProductsPageComponent = ({ products }) => {
  return (
    <div className='px-28'>
      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-2 text-gray-600'>
            <svg width='20' height='20' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.5 6.5L20.25 6.5M10.5 6.5C10.5 7.32843 9.82843 8 9 8C8.17157 8 7.5 7.32843 7.5 6.5M10.5 6.5C10.5 5.67157 9.82843 5 9 5C8.17157 5 7.5 5.67157 7.5 6.5M3.75 6.5H7.5M10.5 18.5H20.25M10.5 18.5C10.5 19.3284 9.82843 20 9 20C8.17157 20 7.5 19.3284 7.5 18.5M10.5 18.5C10.5 17.6716 9.82843 17 9 17C8.17157 17 7.5 17.6716 7.5 18.5M3.75 18.5L7.5 18.5M16.5 12.5L20.25 12.5M16.5 12.5C16.5 13.3284 15.8284 14 15 14C14.1716 14 13.5 13.3284 13.5 12.5M16.5 12.5C16.5 11.6716 15.8284 11 15 11C14.1716 11 13.5 11.6716 13.5 12.5M3.75 12.5H13.5'
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
