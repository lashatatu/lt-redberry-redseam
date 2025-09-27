import { fetchCart } from "../../api/cartApi.js";
import { useCartMutations } from "../../hooks/useCartMutations.js";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import CartItemsComponent from "./CartItemsComponent.jsx";
import CartSumComponent from "./CartSumComponent.jsx";

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

  const {
    patchMutation,
    deleteMutation,
    handleQuantityChange,
    handleRemove
  } = useCartMutations(token);

  const itemSum = cart.reduce((sum, item) => sum + item.quantity, 0);
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
                    <CartItemsComponent
                      cart={cart}
                      deleteMutation={deleteMutation}
                      handleQuantityChange={handleQuantityChange}
                      handleRemove={handleRemove}
                      isError={isError}
                      isLoading={isLoading}
                      patchMutation={patchMutation} />
                  </div>

                  <div className='border-gray-200'>
                    <CartSumComponent cart={cart} />
                    <div className='pt-14'>
                      <button
                        type='button'
                        className='flex items-center w-full justify-center rounded-md border border-transparent bg-orange-700 py-3 font-medium text-white'
                      >
                        <Link to={"/checkout"}>
                          Go to checkout
                        </Link>
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
