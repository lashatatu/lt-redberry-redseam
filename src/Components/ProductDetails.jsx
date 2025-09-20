const ProductDetails = ({ product }) => {
  return (
    <div className='px-28'>
      <p className='pb-12 pt-6'>listing / Products</p>

      {/*first column grid for images*/}
      <div className='grid grid-cols-[8rem_minmax(750px,_1fr)1fr] gap-4 items-start'>
        <div>
          {product.images.map(item => (
            <div className='mb-4 border-red-600 w-30' key={item}>
              <img src={item} alt='' className='w-30' />
            </div>
          ))}
        </div>
        {/*second column solo image*/}
        <div>
          <img src={product.images[0]} className='w-[700px]' alt='' />
        </div>

        {/*third column data*/}
        <div>
          <h2 className='text-xl font-bold pb-6'>{product.description}</h2>
          <p className='font-bold text-xl pb-6'>$ {product.price}</p>
          <div className='pb-6'>
            Color: {product.available_colors[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
