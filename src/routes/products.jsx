import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ProductsPageComponent from "../Components/ProductsComponents/ProductsPageComponent.jsx";

const fetchProducts = async (page = 1, sort, price_from, price_to) => {
  const url = new URL(import.meta.env.VITE_PRODUCT_ID_ENDPOINT);
  url.searchParams.set("page", page);
  if ( sort ) {
    url.searchParams.set("sort", sort);
  }
  if ( price_from ) {
    url.searchParams.set("filter[price_from]", price_from);
  }
  if ( price_to ) {
    url.searchParams.set("filter[price_to]", price_to);
  }
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if ( !res.ok ) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const productsQueryOptions = (page = 1, sort, price_from, price_to) => queryOptions({
  queryKey: ["products", page, sort, price_from, price_to],
  queryFn: () => fetchProducts(page, sort, price_from, price_to)
});

export const Route = createFileRoute("/products")({
  validateSearch: (search) => ({
    page: Number(search.page) || 1,
    sort: search.sort || undefined,
    price_from: search.price_from || undefined,
    price_to: search.price_to || undefined
  }),
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
    const {
      page = 1,
      sort,
      price_from,
      price_to
    } = search;
    return queryClient.ensureQueryData(productsQueryOptions(page, sort, price_from, price_to));
  }
});

function RouteComponent () {
  const {
    page,
    sort,
    price_from,
    price_to
  } = Route.useSearch();
  const { data: products } = useSuspenseQuery(productsQueryOptions(page, sort, price_from, price_to));
  const navigate = Route.useNavigate();

  const handleSort = (newSort, priceFrom, priceTo) => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: newSort,
        page: 1,
        price_from: priceFrom,
        price_to: priceTo
      })
    });
  };

  return (
    <div>
      <ProductsPageComponent
        products={products}
        sort={sort}
        price_from={price_from}
        price_to={price_to}
        onSort={handleSort}
      />
    </div>
  );
}
