import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "RedSeam Clothing | Products"
      }
    ]
  }),
  component: RouteComponent
});

function RouteComponent () {
  return <div>Hello "/products"!</div>;
}
