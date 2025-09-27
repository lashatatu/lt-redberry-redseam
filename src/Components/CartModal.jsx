import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

const patchCartItem = async ({
  token,
  id,
  color,
  size,
  quantity
}) => {
  const response = await fetch(`${import.meta.env.VITE_CART_ENDPOINT}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      color,
      size,
      quantity
    })
  });
  if ( !response.ok ) {
    throw new Error(await response.text());
  }
  return response.json();
};

const deleteCartItem = async ({
  token,
  id,
  color,
  size
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_CART_ENDPOINT}/products/${id}` +
    `?color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
  if ( !response.ok ) {
    throw new Error(await response.text());
  }
  return id;
};

const CartModal = ({
  openModal,
  onClose
}) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    data: cart = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => fetchCart(token),
    enabled: !!token && openModal
  });

  const patchMutation = useMutation({
    mutationFn: patchCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart", token])
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart", token])
  });

  const handleQuantityChange = (product, newQuantity) => {
    patchMutation.mutate({
      token,
      id: product.id,
      color: product.color,
      size: product.size,
      quantity: newQuantity
    });
  };

  const handleRemove = (product) => {
    deleteMutation.mutate({
      token,
      id: product.id,
      color: product.color,
      size: product.size
    });
  };

  const itemSum=cart.reduce((sum,item)=>sum+item.quantity,0)
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
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full '>
              <DialogPanel
                transition
                className='pointer-events-auto w-screen max-w-[540px]'
              >
                <div className='flex h-full flex-col bg-white shadow-xl p-10'>
                  <div className='flex-1'>
                    <div className='flex items-start justify-between'>
                      <DialogTitle className='text-lg font-medium text-gray-900'>Shopping cart ({itemSum})</DialogTitle>
                      <div className='ml-3 flex h-7 items-center'>
                        <button
                          type='button'
                          onClick={() => onClose(false)}
                          className='relative -m-2 p-2 text-gray-400'
                        >
                          <span className='absolute -inset-0.5' />
                          <span className='sr-only'>Close panel</span>
                          <IoMdClose aria-hidden='true' className='size-6' />
                        </button>
                      </div>
                    </div>

                    <div className='pt-14'>
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
                                  <div className='size-34 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <img
                                      alt={product.name}
                                      src={
                                        product.images[
                                          product.available_colors.findIndex(c => c === product.color)
                                          ] || product.images[0]
                                      }
                                      className='size-full object-cover' />
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
                  </div>

                  <div className='border-gray-200'>
                    <div className='flex justify-between text-base font-medium text-gray-500 pb-2'>
                      <p>Items subtotal</p>
                      <p>$ {subtotal}</p>
                    </div>
                    <div className='flex justify-between text-base font-medium text-gray-500 pb-2'>
                      <p>Delivery</p>
                      <p>$ {delivery}</p>
                    </div>
                    <div className='flex justify-between text-base font-medium '>
                      <p>Total</p>
                      <p>$ {total}</p>
                    </div>
                    <div className='pt-14'>
                      <button
                        type='button'
                        className='flex items-center w-full justify-center rounded-md border border-transparent bg-orange-700 py-3 font-medium text-white'
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
