import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductDetails from "../../../Components/ProductDetails.jsx";
import CartModal from "../../../Components/CartComponents/CartModal.jsx";

const fetchProduct = async (productId) => {
  const res = await fetch(`${import.meta.env.VITE_PRODUCT_ID_ENDPOINT}/${productId}`, {
    headers: {
      Accept: "application/json"
    }
  });
  if ( !res.ok ) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const productQueryOptions = (productId) => queryOptions({
  queryKey: ["product", productId],
  queryFn: () => fetchProduct(productId)
});

export const Route = createFileRoute("/product/$productId/")({
  component: ProductId,
  loader: async ({
    params,
    context: { queryClient }
  }) => {
    return queryClient.ensureQueryData(productQueryOptions(params.productId));
  }
});

function ProductId () {
  const { productId } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(productId));
  const [openModal, setOpenModal] = useState(false);

  return <div>
    <ProductDetails
      product={product}
      onOpenModal={() => setOpenModal(true)}
      onClose={setOpenModal}
    />
    <CartModal openModal={openModal} onClose={setOpenModal} />
  </div>;
}
