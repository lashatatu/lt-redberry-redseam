import React, { useState, useRef } from "react";
import PriceFilterComponent from "./PriceFilterComponent.jsx";
import ProductsSortByComponent from "./ProductsSortByComponent.jsx";
import ProductsPaginationComponent from "./ProductsPaginationComponent.jsx";
import ProductsItemCardComponent from "./ProductsItemCardComponent.jsx";

const ProductsPageComponent = ({ products, sort, onSort }) => {
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
    <div className='px-28'>

      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <PriceFilterComponent filterRef={filterRef} showFilter={showFilter} onToggle={handleToggleFilter} onSort={onSort} />
          <ProductsSortByComponent sortByRef={sortByRef} showSortBy={showSortBy} onToggle={handleToggleSortBy} onSort={onSort} />
        </div>
      </div>
      <ProductsItemCardComponent products={products}/>
      <div className='flex justify-center py-12'>
        <ProductsPaginationComponent products={products} sort={sort} />
      </div>
    </div>
  );
};

export default ProductsPageComponent;
