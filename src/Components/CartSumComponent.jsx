import { Link } from "@tanstack/react-router";

const CartSumComponent = ({cart}) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = cart.length === 0 ? 0 : 5;
  const total = delivery + subtotal;
  return (
    <div>
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
    </div>
  );
};

export default CartSumComponent;
