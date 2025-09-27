import { createFileRoute } from '@tanstack/react-router'

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
  return <div>Hello "/cart"!</div>
}
