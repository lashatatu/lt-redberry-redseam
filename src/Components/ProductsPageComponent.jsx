import React, { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import PriceFilterComponent from "./PriceFilterComponent.jsx";
import ProductsSortByComponent from "./ProductsSortByComponent.jsx";

const ProductsPageComponent = ({ products }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const filterRef = useRef(null);
  const sortByRef = useRef(null);

  return (
    <div className='px-28'>
      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <PriceFilterComponent filterRef={filterRef} setShowFilter={setShowFilter} showFilter={showFilter} />
          <ProductsSortByComponent sortByRef={sortByRef} setShowSortBy={setShowSortBy} showSortBy={showSortBy} />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {products.data.map((item) => (
          <Link to={`../product/${item.id}`} key={item.id}>
            <div className='pb-12'>
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
