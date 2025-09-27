import { createFileRoute } from '@tanstack/react-router'
import CheckoutPageComponent from "../Components/CheckoutPageComponent.jsx";

export const Route = createFileRoute('/checkout')({
  head: () => ({
    meta: [
      {
        title: "RedSeam Clothing | Cart"
      }
    ]
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <CheckoutPageComponent />
  </div>
}
