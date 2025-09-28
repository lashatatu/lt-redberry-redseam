import React, { useState } from "react";
import ProductsPriceFilterComponent from "./ProductsPriceFilterComponent.jsx";
import ProductsSortByComponent from "./ProductsSortByComponent.jsx";
import ProductsPaginationComponent from "./ProductsPaginationComponent.jsx";
import ProductsItemCardComponent from "./ProductsItemCardComponent.jsx";
import ProductsPageShowingResultsComponent from "./ProductsPageShowingResultsComponent.jsx";

const ProductsPageComponent = ({ products, sort, price_from, price_to, onSort }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);

  const handleFilterDialog = (open) => {
    setShowFilter(open);
    if (open) setShowSortBy(false);
  };

  const handleSortByDialog = (open) => {
    setShowSortBy(open);
    if (open) setShowFilter(false);
  };

  return (
    <div className='px-25'>
      <div className='flex justify-between py-12'>
        <h1 className='text-4xl font-bold'>Products</h1>
        <div className='flex items-center space-x-4'>
          <ProductsPageShowingResultsComponent
            total={products?.meta?.total || 0}
            page={products?.meta?.current_page || 1}
            pageSize={products?.meta?.per_page || products?.meta?.page_size || 10}
          />
          <ProductsPriceFilterComponent open={showFilter} onClose={handleFilterDialog} onSort={onSort} sort={sort} price_from={price_from} price_to={price_to} />
          <ProductsSortByComponent open={showSortBy} onClose={handleSortByDialog} onSort={onSort} sort={sort} price_from={price_from} price_to={price_to} />
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
