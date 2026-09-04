import React from "react";
import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import prerenderRoutes from "../prerender-routes.json";
import { DEMO2_BASENAME, routeObjects } from "./routes";

export { prerenderRoutes };

export function render(pathname: string) {
  const route = pathname === "/" ? `${DEMO2_BASENAME}/` : `${DEMO2_BASENAME}${pathname}`;
  const router = createMemoryRouter(routeObjects, {
    basename: DEMO2_BASENAME,
    initialEntries: [route],
  });

  return renderToString(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
