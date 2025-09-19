import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId/')({
  component: ProductId,
})

function ProductId() {
  return <div>Hello "/product/$productId/"!</div>
}
