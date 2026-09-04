import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  if (!router) throw new Error("Demo2's browser router is unavailable outside the browser entry point.");
  return <RouterProvider router={router} />;
}
