# Add Component Test

Add component tests using Storybook play functions. These are interactive tests that run inside stories.

## Input

$ARGUMENTS

## Requirements

### Overview

Component tests in this project are written as Storybook **play functions** — async test logic that runs inside a story. They are executed by Vitest via `@storybook/addon-vitest` with Playwright/Chromium as the browser provider.

### Locating the Story File

Stories are co-located with their components as `<ComponentName>.stories.tsx`. The component's layer determines the path:

- Shared UI: `packages/ui/src/<Category>/<ComponentName>/<ComponentName>.stories.tsx`
- Reusable web-app UI: `apps/web/src/components/<category>/<component-name>/<ComponentName>.stories.tsx`
- Page view: `apps/web/src/views/<name>/<Name>View.stories.tsx`
- Core/router-level UI: `apps/web/src/core/routes/logic/<Name>.stories.tsx` (rare)

Story titles follow the `Top-Level / Category / Component Name` convention — see [`docs/naming.md#story-titles`](../../docs/naming.md#story-titles).

If a story file does not exist yet, create one following the pattern below.

### Story with Play Function Pattern

```tsx
import { ContainerDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MyComponent as Component } from "./MyComponent";
import type { MyComponentProps as Props } from "./MyComponent";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "<Category>/<ComponentName>",
  tags: ["autodocs"],
  // Use decorators if the component needs layout context
  decorators: [ContainerDecorator],
  parameters: {
    a11y: {
      config: {
        rules: [
          // Disable specific a11y rules only when justified
          // { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Props = {
  // provide default prop values
};

// Basic render story (no interaction test)
export const Default: Story = {
  args: defaultArgs,
};

// Story with play function (interaction test)
export const WithInteraction: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // Query elements using data-testid
    await userEvent.type(canvas.getByTestId("my-component__input"), "test value");
    await userEvent.click(canvas.getByTestId("my-component__submit"));

    // Assert expected outcomes
    await expect(canvas.getByTestId("my-component__input")).toHaveValue("test value");
    await expect(canvas.getByText("Success message")).toBeInTheDocument();
  },
} satisfies Story;

// Story testing error/edge case
export const ValidationError: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // Submit without filling required fields
    await userEvent.click(canvas.getByTestId("my-component__submit"));

    // Assert validation message appears
    await expect(canvas.getByText("This field is required")).toBeInTheDocument();
  },
} satisfies Story;
```

### Key Patterns

- **Imports**: Use `expect` from `"storybook/test"`, types from `"@storybook/react-vite"`
- **Play function signature**: `async ({ canvas, userEvent }) => { ... }`
- **DOM queries**: Use `canvas.getByTestId()`, `canvas.getByText()`, `canvas.getByRole()`
- **User interactions**: `userEvent.type()`, `userEvent.click()`, `userEvent.clear()`
- **Assertions**: `expect(element).toHaveValue()`, `expect(element).toBeInTheDocument()`, `expect(element).toHaveTextContent()`
- **Type safety**: Add `satisfies Story` to play-function stories for full type checking
- **data-testid convention**: `<component-name>__<element-name>` (double underscore separator)

### What to Test

- **Form components**: Valid submission, validation errors for each field, edge cases
- **Interactive components**: Click handlers, toggle states, hover effects
- **Conditional rendering**: Different states based on props or user interaction
- **Accessibility**: Keyboard navigation, focus management where relevant

### Decorators

Available decorators from `@package/storybook`:
- `ContainerDecorator` — wraps the component in a centered container for form/card layouts

### After Creating/Updating Stories

1. Run `pnpm lint:fix` to ensure code quality
2. Run `pnpm test` to execute all component tests (Vitest + Storybook)
3. Start Storybook with `pnpm storybook` and verify the story renders and play functions execute correctly

## Checklist

- [ ] Identified or created the `.stories.tsx` file for the target component
- [ ] Added play functions with `async ({ canvas, userEvent })` signature
- [ ] Used `canvas.getByTestId()` for element queries (added `data-testid` to component if missing)
- [ ] Used `expect` from `"storybook/test"` for assertions
- [ ] Added `satisfies Story` to stories with play functions
- [ ] Tested happy path and error/edge cases
- [ ] Ran `pnpm lint:fix`
- [ ] Ran `pnpm test` to verify tests pass
- [ ] Verified story renders in Storybook
