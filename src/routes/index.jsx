import { createFileRoute } from "@tanstack/react-router";
import APP from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "RedSeam Clothing | Home"
      }
    ]
  }),
  component: App
});

function App() {
  return (
    <>
      <APP />
    </>
  );
}
