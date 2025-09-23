import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ProductsPageComponent from "../Components/ProductsPageComponent.jsx";

const fetchProducts = async (page = 1, sort) => {
  const url = new URL(import.meta.env.VITE_PRODUCT_ID_ENDPOINT);
  url.searchParams.set("page", page);
  if (sort) {
    url.searchParams.set("sort", sort);
  }
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

const productsQueryOptions = (page = 1, sort) => queryOptions({
  queryKey: ["products", page, sort],
  queryFn: () => fetchProducts(page, sort)
});

export const Route = createFileRoute("/products")({
  validateSearch: (search) => {
    return {
      page: Number(search.page) || 1,
      sort: search.sort || undefined
    };
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
    const { page = 1, sort } = search;
    return queryClient.ensureQueryData(productsQueryOptions(page, sort));
  }
});

function RouteComponent() {
  const { page, sort } = Route.useSearch();
  const { data: products } = useSuspenseQuery(productsQueryOptions(page, sort));
  const navigate = Route.useNavigate();

  const handleSort = (newSort) => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: newSort,
        page: 1
      })
    });
  };

  return (
    <div>
      <ProductsPageComponent products={products} sort={sort} onSort={handleSort} />
    </div>
  );
}
