import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import HeaderComponent from "../Components/HeaderComponent.jsx";

export const Route = createRootRouteWithContext() ({
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
        <HeaderComponent/>
        <HeadContent />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  }
);


