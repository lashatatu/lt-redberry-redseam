import { Link } from "@tanstack/react-router";
import React from "react";

const ProductsItemCardComponent = ({products}) => {
  return (
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
  );
};

export default ProductsItemCardComponent;
