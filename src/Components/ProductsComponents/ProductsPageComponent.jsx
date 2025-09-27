import React, { useState, useRef } from "react";
import ProductsPriceFilterComponent from "./ProductsPriceFilterComponent.jsx";
import ProductsSortByComponent from "./ProductsSortByComponent.jsx";
import ProductsPaginationComponent from "./ProductsPaginationComponent.jsx";
import ProductsItemCardComponent from "./ProductsItemCardComponent.jsx";

const ProductsPageComponent = ({ products, sort, price_from, price_to, onSort }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const filterRef = useRef(null);
  const sortByRef = useRef(null);

  const handleToggleFilter = () => {
    setShowFilter((prev) => {
      if ( !prev ) {
        setShowSortBy(false);
      }
      return !prev;
    });
  };

  const handleToggleSortBy = () => {
    setShowSortBy((prev) => {
      if ( !prev ) {
        setShowFilter(false);
      }
      return !prev;
    });
  };
  return (
    <div className='px-25'>
      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <ProductsPriceFilterComponent filterRef={filterRef} showFilter={showFilter} onToggle={handleToggleFilter} onSort={onSort} sort={sort} price_from={price_from} price_to={price_to} />
          <ProductsSortByComponent sortByRef={sortByRef} showSortBy={showSortBy} onToggle={handleToggleSortBy} onSort={onSort} sort={sort} price_from={price_from} price_to={price_to} />
        </div>
      </div>
      <ProductsItemCardComponent products={products}/>
      <div className='flex justify-center py-12'>
        <ProductsPaginationComponent products={products} sort={sort} price_from={price_from} price_to={price_to} />
      </div>
    </div>
  );
};

export default ProductsPageComponent;
