import { Link } from "@tanstack/react-router";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CartItemsComponent = ({ isLoading, isError, cart, handleQuantityChange, handleRemove, deleteMutation, patchMutation }) => {
  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <div className='flow-root pb-14'>
        {isLoading ? (
          <div className='py-6 text-center text-gray-500 text-2xl font-bold'>Loading...</div>
        ) : isError ? (
          <div className='py-6 text-center text-red-500 text-2xl font-bold'>Not Logged in</div>
        ) : (
          <ul role='list' className='-my-6'>
            {cart.length === 0 ? (
              <div className='py-6 flex flex-col text-center  items-center'>
                <img src='/img_1.png' alt='Empty Cart' />
                <h1 className='font-bold text-5xl text-gray-500 pb-6'>Ooops!</h1>
                <p className='pb-12'>You've got nothing in your cart</p>
                <button className='bg-orange-700 text-white rounded-xl py-1 text-lg px-10 w-fit'>
                  <Link to={"/products"}>
                    Start shopping
                  </Link>
                </button>
              </div>
            ) : (
              cart.map((product) => (
                <li key={product.id + product.color + product.size} className='flex py-6'>
                  <div className='h-33 w-25 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                    <img
                      alt={product.name}
                      src={
                        product.images[
                          product.available_colors.findIndex(c => c === product.color)
                          ] || product.images[0]
                      }
                      className='size-fit object-cover' />
                  </div>

                  <div className='ml-4 flex flex-1 flex-col'>
                    <div>
                      <div className='flex justify-between font-medium text-sm'>
                        <h3>{product.name}</h3>
                        <p className='ml-4 text-lg'>${product.price}</p>
                      </div>
                      <p className='mt-1 text-xs text-gray-500'>{product.color}</p>
                      <p className='mt-1 text-xs text-gray-500'>{product.size}</p>
                    </div>
                    <div className='flex flex-1 items-end justify-between text-sm'>
                      <div className='flex text-xs items-center gap-2 border rounded-3xl pt-1 pr-2 pb-1 pl-2 border-gray-300'>
                        <button
                          className='disabled:opacity-50'
                          disabled={product.quantity === 1 || patchMutation.isLoading}
                          onClick={() => handleQuantityChange(product, product.quantity - 1)}
                        ><FaMinus /></button>
                        <span>{product.quantity}</span>
                        <button
                          className='disabled:opacity-50'
                          disabled={patchMutation.isLoading}
                          onClick={() => handleQuantityChange(product, product.quantity + 1)}
                        ><FaPlus /></button>
                      </div>
                      <button
                        className='text-gray-500 ml-4 text-base'
                        onClick={() => handleRemove(product)}
                        disabled={deleteMutation.isLoading}
                      >Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartItemsComponent;
