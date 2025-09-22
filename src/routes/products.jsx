import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ProductsPageComponent from "../Components/ProductsPageComponent.jsx";

const fetchProducts = async (page = 1) => {
  const url = new URL(import.meta.env.VITE_PRODUCT_ID_ENDPOINT);
  url.searchParams.set("page", page);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const productsQueryOptions = (page = 1) => queryOptions({
  queryKey: ["products", page],
  queryFn: () => fetchProducts(page)
});

export const Route = createFileRoute("/products")({
  validateSearch: (search) => {
    return { page: Number(search.page) || 1 };
  },
  head: () => ({
    meta: [
      {
        title: "RedSeam Clothing | Products"
      }
    ]
  }),
  component: RouteComponent,
  loader: async ({
    context: { queryClient },
    search = {}
  }) => {
    const { page = 1 } = search;
    return queryClient.ensureQueryData(productsQueryOptions(page));
  }
});


function RouteComponent() {
  const { page } = Route.useSearch();
  const { data: products } = useSuspenseQuery(productsQueryOptions(page));

  return (
    <div>
      <ProductsPageComponent products={products} />
    </div>
  );
}
