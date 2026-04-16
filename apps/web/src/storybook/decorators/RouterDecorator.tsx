import type { Decorator } from "@storybook/react-vite";
import type { AnyRoute, AnyRouter } from "@tanstack/react-router";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";

export const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({
    component: () => <Story />,
  }) as unknown as AnyRoute;

  // Casts required because consumers (e.g. apps/web) augment TanStack Router's
  // `Register` interface with their own route tree, which makes the locally
  // created root route incompatible with the augmented router types.
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  }) as unknown as AnyRouter;

  return <RouterProvider router={router} />;
};
