import CartItemsComponent from "../CartComponents/CartItemsComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../../api/cartApi.js";
import { useCartMutations } from "../../hooks/useCartMutations.js";
import CartSumComponent from "../CartComponents/CartSumComponent.jsx";
import CheckoutAddressDetailsComponent from "./CheckoutAddressDetailsComponent.jsx";

const CheckoutPageComponent = () => {
  const token = localStorage.getItem("token");

  const {
    data: cart = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => fetchCart(token)
  });

  const {
    patchMutation,
    deleteMutation,
    handleQuantityChange,
    handleRemove
  } = useCartMutations(token);

  return (
    <div className='px-25'>
      <h1 className='font-semibold text-5xl py-10'>Checkout</h1>
      <div className='grid grid-cols-6 gap-10 h-159'>
        <div className='pl-2 bg-[#f8f6f7] col-span-4 rounded-2xl pt-15'>
          <div className='px-10 '>
            <h2 className='text-[22px] font-medium pb-12'>Order details</h2>
            {/*shipping element*/}
            <CheckoutAddressDetailsComponent />
            <div className='col-span-4'>
              {/*empty*/}
            </div>
          </div>
        </div>
        <div className='flex h-full flex-col col-span-2 ml-20'>
          <CartItemsComponent
            cart={cart}
            deleteMutation={deleteMutation}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
            isError={isError}
            isLoading={isLoading}
            patchMutation={patchMutation} />
          <CartSumComponent cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageComponent;
