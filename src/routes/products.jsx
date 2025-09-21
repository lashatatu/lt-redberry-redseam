import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ProductsPageComponent from "../Components/ProductsPageComponent.jsx";

const fetchProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_PRODUCT_ID_ENDPOINT}`, {
    headers: {
      Accept: "application/json"
    }
  });
  if ( !res.ok ) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const productsQueryOptions = () => queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts()
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "RedSeam Clothing | Products"
      }
    ]
  }),
  component: RouteComponent,
  loader: async ({
    context: { queryClient }
  }) => {
    return queryClient.ensureQueryData(productsQueryOptions());
  }
});

function RouteComponent () {
  const { data: products } = useSuspenseQuery(productsQueryOptions());

  return <div>

    <ProductsPageComponent products={products} />
  </div>;
}
