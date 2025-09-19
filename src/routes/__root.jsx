import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute ({
    head: () => ({
      meta: [
        {
          name: "description",
          content: "RedSeam Clothing Ecommerce app for Redberry"
        },
        {
          title: "RedSeam Clothing"
        }
      ]
    }),
    component: () => (
      <>
        <HeadContent />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  }
);


