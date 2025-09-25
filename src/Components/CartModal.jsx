import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const fetchCart = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });
  if ( !response.ok ) {
    throw new Error(await response.text());
  }
  return response.json();
};

const CartModal = ({
  openModal,
  onClose
}) => {
  const token = localStorage.getItem("token");

  const {
    data: cart = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => fetchCart(token),
    enabled: !!token && openModal
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = cart.length === 0 ? 0 : 5;
  const total = delivery + subtotal;

  return (
    <div>
      <Dialog open={openModal} onClose={onClose} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0'
        />

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
              <DialogPanel
                transition
                className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700'
              >
                <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl'>
                  <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                    <div className='flex items-start justify-between'>
                      <DialogTitle className='text-lg font-medium text-gray-900'>Shopping cart</DialogTitle>
                      <div className='ml-3 flex h-7 items-center'>
                        <button
                          type='button'
                          onClick={() => onClose(false)}
                          className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                        >
                          <span className='absolute -inset-0.5' />
                          <span className='sr-only'>Close panel</span>
                          <IoMdClose aria-hidden='true' className='size-6' />
                        </button>
                      </div>
                    </div>

                    <div className='mt-8'>
                      <div className='flow-root'>
                        {isLoading ? (
                          <div className='py-6 text-center text-gray-500 text-2xl font-bold'>Loading...</div>
                        ) : isError ? (
                          <div className='py-6 text-center text-red-500 text-2xl font-bold'>Not Logged in</div>
                        ) : (
                          <ul role='list' className='-my-6 '>
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
                                  <div className='size-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <img
                                      alt={product.name}
                                      src={product.cover_image}
                                      className='size-full object-cover' />
                                  </div>

                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <h3>{product.name}</h3>
                                        <p className='ml-4'>${product.price}</p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>{product.color} / {product.size}</p>
                                    </div>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <p className='text-gray-500'>Qty {product.quantity}</p>
                                      <div className='flex'>
                                        {/*remove functionality will be added here*/}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                    <div className='flex justify-between text-base font-medium text-gray-500'>
                      <p>Items subtotal</p>
                      <p>$ {subtotal}</p>
                    </div>
                    <div className='flex justify-between text-base font-medium text-gray-500'>
                      <p>Delivery</p>
                      <p>$ {delivery}</p>
                    </div>
                    <div className='flex justify-between text-base font-medium '>
                      <p>Total</p>
                      <p>$ {total}</p>
                    </div>
                    <div className='mt-6'>
                      <button
                        type='button'
                        className='flex items-center w-full justify-center rounded-md border border-transparent bg-orange-700 px-6 py-3 font-medium text-white'
                      >
                        Go to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CartModal;
