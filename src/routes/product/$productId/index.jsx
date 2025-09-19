import { createFileRoute } from "@tanstack/react-router";

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

export const Route = createFileRoute("/product/$productId/")({
  component: ProductId,
  loader: async ({ params }) => {
    return fetchProduct(params.productId);
  }
});

function ProductId () {
  const product = Route.useLoaderData();
  return <div>Hello {product.name}</div>;
}
