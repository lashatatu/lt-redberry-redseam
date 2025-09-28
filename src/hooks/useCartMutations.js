import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCartItem, deleteCartItem, checkoutCart } from "../api/cartApi";

export const useCartMutations = (token) => {
  const queryClient = useQueryClient();

  const patchMutation = useMutation({
    mutationFn: patchCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart", token])
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart", token])
  });

  const checkoutMutation = useMutation({
    mutationFn: ({ data }) => checkoutCart({ token, data }),
    onError: (error, variables) => {
      if (variables && typeof variables.onCheckoutError === 'function') {
        variables.onCheckoutError(error);
      }
    },
    onSuccess: (data, variables) => {
      if (variables && typeof variables.onCheckoutSuccess === 'function') {
        variables.onCheckoutSuccess(data);
      }
      queryClient.invalidateQueries(["cart", token]);
    }
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

  return { patchMutation, deleteMutation, handleQuantityChange, handleRemove, checkoutMutation };
};
