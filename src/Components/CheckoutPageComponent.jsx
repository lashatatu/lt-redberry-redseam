import CartItemsComponent from "./CartItemsComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../api/cartApi.js";
import { useCartMutations } from "../hooks/useCartMutations.js";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import CartSumComponent from "./CartSumComponent.jsx";

const CheckoutPageComponent = () => {
  const token = localStorage.getItem("token");

  const {
    data: cart = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => fetchCart(token),
  });

  const {
    patchMutation,
    deleteMutation,
    handleQuantityChange,
    handleRemove
  } = useCartMutations(token);

  return (
    <div className='flex h-full flex-col bg-whitep-10'>

      <CartItemsComponent
        cart={cart}
        deleteMutation={deleteMutation}
        handleQuantityChange={handleQuantityChange}
        handleRemove={handleRemove}
        isError={isError}
        isLoading={isLoading}
        patchMutation={patchMutation} />
      <CartSumComponent cart={cart}/>
    </div>
  );
};

export default CheckoutPageComponent;
