import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { fetchCart } from "../../api/cartApi.js";
import { useCartMutations } from "../../hooks/useCartMutations.js";
import CartItemsComponent from "../CartComponents/CartItemsComponent.jsx";
import CartSumComponent from "../CartComponents/CartSumComponent.jsx";
import CheckoutAddressDetailsComponent from "./CheckoutAddressDetailsComponent.jsx";
import CheckoutSuccessModal from "./CheckoutSuccessModal.jsx";

const CheckoutPageComponent = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const [addressData, setAddressData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: ""
  });

  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

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
    handleRemove,
    checkoutMutation
  } = useCartMutations(token);

  const handlePay = () => {
    checkoutMutation.mutate({
      data: addressData,
      onCheckoutError: (error) => setErrors(error.errors || {}),
      onCheckoutSuccess: () => {
        setErrors({});
        setSuccessOpen(true);
      }
    });
  };

  const handleContinue = () => {
    setSuccessOpen(false);
    navigate({ to: "/products" });
  };

  return (
    <div className='px-25'>
      <h1 className='font-semibold text-5xl py-10'>Checkout</h1>
      <div className='grid grid-cols-6 gap-10'>
        <div className='pl-2 bg-[#f8f6f7] col-span-4 rounded-2xl pt-15'>
          <div className='px-10 '>
            <h2 className='text-[22px] font-medium pb-12'>Order details</h2>
            {/*shipping element*/}
            <CheckoutAddressDetailsComponent
              addressData={addressData}
              setAddressData={setAddressData}
              errors={errors}
            />
            <div className='col-span-4'>
              {/*empty*/}
            </div>
          </div>
        </div>
        <div className='flex flex-col col-span-2 ml-20 max-h-159'>
          <CartItemsComponent
            cart={cart}
            deleteMutation={deleteMutation}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
            isError={isError}
            isLoading={isLoading}
            patchMutation={patchMutation}
          />
          <CartSumComponent cart={cart} />
          <div className='pt-14'>
            <button
              type='button'
              className='flex items-center w-full justify-center rounded-md border border-transparent bg-orange-700 py-3 font-medium text-white cursor-pointer'
              onClick={handlePay}
              disabled={checkoutMutation.isLoading}
            >
              Pay
            </button>
            {checkoutMutation.isError && (
              <div className='text-red-600 mt-2'>
                {checkoutMutation.error?.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <CheckoutSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default CheckoutPageComponent;
