import type { Meta, StoryObj } from "@storybook/react-vite";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { RouteError } from "./RouteError";

function RouteErrorStory({ error }: { error?: Error }): React.ReactElement {
  const rootRoute = createRootRoute({
    component: () => <RouteError error={error} />,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });

  return <RouterProvider router={router} />;
}

const meta: Meta<typeof RouteErrorStory> = {
  component: RouteErrorStory,
  title: "Route/Error",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrorMessage: Story = {
  args: {
    error: new Error("Failed to fetch data from /api/users"),
  },
};
