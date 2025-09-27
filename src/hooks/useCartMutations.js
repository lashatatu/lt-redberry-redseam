import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCartItem, deleteCartItem } from "../api/cartApi";

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

  return { patchMutation, deleteMutation, handleQuantityChange, handleRemove };
};
