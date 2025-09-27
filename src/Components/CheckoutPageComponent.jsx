import CartItemsComponent from "./CartItemsComponent.jsx";

const CheckoutPageComponent = ({isLoading,isError,cart,handleQuantityChange,handleRemove,deleteMutation,patchMutation}) => {
  return (
    <div>

      <CartItemsComponent
        cart={cart}
        deleteMutation={deleteMutation}
        handleQuantityChange={handleQuantityChange}
        handleRemove={handleRemove}
        isError={isError}
        isLoading={isLoading}
        patchMutation={patchMutation} />
    </div>
  );
};

export default CheckoutPageComponent;
