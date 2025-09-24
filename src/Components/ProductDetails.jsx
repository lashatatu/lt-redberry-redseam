import { useState } from "react";

const ProductDetails = ({ product }) => {
  const uniqueCollors = {
    "Yellow": "bg-yellow-500",
    "Green": "bg-green-500",
    "Black": "bg-black",
    "Beige": "bg-yellow-100",
    "Navy Blue": "bg-blue-900",
    "Peach": "bg-orange-200",
    "White": "bg-gray-100",
    "Blue": "bg-blue-500",
    "Grey": "bg-gray-500",
    "Cream": "bg-yellow-50",
    "Pink": "bg-pink-500",
    "Purple": "bg-purple-500",
    "Maroon": "bg-red-900",
    "Orange": "bg-orange-500",
    "Brown": "bg-yellow-900",
    "Olive": "bg-green-700",
    "Red": "bg-red-500",
    "Multi": "bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500",
    "Khaki": "bg-yellow-200",
    "Mauve": "bg-purple-200",
    "Off White": "bg-gray-100",
    "Magenta": "bg-pink-700"
  };
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  return (
    <div className='px-28'>
      <p className='pb-12 pt-6'>Listing / Products</p>

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
          <img src={product.cover_image} className='w-[700px]' alt='' />
        </div>

        {/*third column data*/}
        <div>
          <h2 className='text-3xl font-bold pb-6'>{product.name}</h2>
          <p className='text-3xl font-bold pb-6'>$ {product.price}</p>
          <div className='pb-6'>
            <div className='flex pb-4'>Color: {selectedColor && (
              <span className='ml-2'>{selectedColor}</span>
            )}
            </div>
            <div className='flex gap-8'>
              {product.available_colors.map((color, idx) => (
                <div
                  key={idx}
                  className={`p-1 rounded-full border-1 flex items-center justify-center ${selectedColor === color ? 'border-gray-300' : 'border-transparent'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ${uniqueCollors[color]}`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='pb-4'>Size: {selectedSize && (
              <span className='ml-2'>{selectedSize}</span>
            )}
            </div>
            <div className='flex gap-2 pb-12'>
              {product.available_sizes.map((size, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg border-gray-200 w-12 flex justify-center items-center cursor-pointer ${selectedSize ===
                  size ? "border-gray-950" : ""}`}
                  onClick={() => setSelectedSize(size)}>{size}</div>
              ))}
            </div>
            <div className='pb-12'>
              <div>Quantity</div>
              <input type='number' defaultValue={1} className='w-12 border border-gray-300 rounded text-center' />
            </div>

            <button className='bg-orange-700 w-full rounded-lg cursor-pointer mb-12'>
              <div className='items-center flex justify-center p-2'>
                <svg width='24' height='24' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M2.25 3.5H3.63568C4.14537 3.5 4.59138 3.84265 4.7227 4.33513L5.1059 5.77209M7.5 14.75C5.84315 14.75 4.5 16.0931 4.5 17.75H20.25M7.5 14.75H18.7183C19.8394 12.4494 20.8177 10.0664 21.6417 7.6125C16.88 6.39646 11.8905 5.75 6.75 5.75C6.20021 5.75 5.65214 5.7574 5.1059 5.77209M7.5 14.75L5.1059 5.77209M6 20.75C6 21.1642 5.66421 21.5 5.25 21.5C4.83579 21.5 4.5 21.1642 4.5 20.75C4.5 20.3358 4.83579 20 5.25 20C5.66421 20 6 20.3358 6 20.75ZM18.75 20.75C18.75 21.1642 18.4142 21.5 18 21.5C17.5858 21.5 17.25 21.1642 17.25 20.75C17.25 20.3358 17.5858 20 18 20C18.4142 20 18.75 20.3358 18.75 20.75Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round' />
                </svg>
                <div className='text-white pl-2 text-lg'>Add to Cart</div>
              </div>
            </button>
            <hr />
            <div className='flex justify-between py-6 items-center'>
              <div className='text-xl'>Details</div>
              <div>
                <img src={product.brand.image} alt='' className='h-18' />
              </div>
            </div>
            <div className='text-gray-500'>
              <div className='pb-6'>Brand: {product.brand.name}</div>
              <div>{product.description}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
