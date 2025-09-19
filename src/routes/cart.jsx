import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cart')({
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
