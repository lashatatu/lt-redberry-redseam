import { createFileRoute } from "@tanstack/react-router";
import APP from "../App";

export const Route = createFileRoute("/")({
  component: App
});

function App() {
  return (
    <>
      <APP />
    </>
  );
}
