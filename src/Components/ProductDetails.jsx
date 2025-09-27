import { useState, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ProductDetails = ({ product }) => {
  const uniqueColors = {
    "Yellow": "bg-yellow-500",
    "Green": "bg-green-500",
    "Black": "bg-black",
    "Beige": "bg-yellow-100",
    "Navy Blue": "bg-blue-900",
    "Peach": "bg-orange-200",
    "White": "white",
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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const mutation = useMutation({
    mutationFn: async (item) => {
      const response = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}/products/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', token]);
    }
  });

  const handleAddToCart = (item) => {
    mutation.mutate(item);
  };

  useEffect(() => {
    if ( product && product.available_sizes && product.available_sizes.length > 0 ) {
      if ( product.available_sizes.includes("M") ) {
        setSelectedSize("M");
      } else {
        setSelectedSize(product.available_sizes[0]);
      }
    }
    if ( product && product.available_colors && product.available_colors.length > 0 ) {
      setSelectedColor(product.available_colors[0]);
      setSelectedColorIndex(0);
    }
  }, [product]);

  return (
    <div className='px-25'>
      <p className='pb-12 pt-6'>Listing / Products</p>

      {/*first column grid for images*/}
      <div className='grid grid-cols-[8rem_minmax(750px,_1fr)1fr] gap-4 items-start'>
        <div>
          {product.images?.map(item => (
            <div className='mb-4 border-red-600 w-30' key={item}>
              <img src={item} alt='' className='w-30' />
            </div>
          ))}
        </div>
        {/*second column solo image*/}
        <div>
          {product.images && product.images.length > 0 && (
            <img src={product.images[selectedColorIndex] || product.images[0]} className='w-[700px]' alt='' />
          )}
        </div>

        {/*third column data*/}
        <div>
          <h2 className='text-3xl font-bold pb-6'>{product.name}</h2>
          <p className='text-3xl font-bold pb-6'>$ {product.price}</p>
          <div className='pb-12'>
            <div className='flex pb-4'>Color: {selectedColor && (
              <span className='ml-2'>{selectedColor}</span>
            )}
            </div>
            <div className='flex gap-8'>
              {product.available_colors?.map((color, idx) => (
                <div
                  key={idx}
                  className={`p-1 rounded-full border-1 flex ${selectedColor ===
                  color ? "border-gray-300" : "border-transparent"}`}
                >
                  <div
                    className={`w-8 h-8 shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-full flex cursor-pointer ${uniqueColors[color]}`}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedColorIndex(idx);
                    }}
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
              {product.available_sizes?.map((size, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg border-gray-200 w-12 flex justify-center items-center cursor-pointer ${selectedSize ===
                  size ? "border-gray-950" : ""}`}
                  onClick={() => setSelectedSize(size)}>{size}</div>
              ))}
            </div>
            <div className='pb-12'>
              <div className='pb-4'>Quantity</div>
              <select
                name='quantity'
                id='quantity'
                defaultValue={1}
                onChange={e => setQuantity(Number(e.target.value))}
                className='w-16 border border-gray-300 rounded text-center'
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>

            <button
              className='bg-orange-700 w-full rounded-lg cursor-pointer mb-12'
              onClick={() => handleAddToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                color: selectedColor,
                size: selectedSize,
                image: product.images[selectedColorIndex] || product.images[0],
                quantity
              })}
              disabled={mutation.isLoading}
            >
              <div className='items-center flex justify-center p-2'>
                <HiOutlineShoppingCart size={24} fill='#CA3500' stroke='white' />
                <div className='text-white pl-2 text-lg'>{mutation.isLoading ? 'Adding...' : 'Add to Cart'}</div>
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
