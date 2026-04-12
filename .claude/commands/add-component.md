# Add Component

Add a new component to the project. The user will describe what component they need.

## Input

$ARGUMENTS

## Requirements

### MANDATORY: Use HeroUI v3 Components

You MUST use HeroUI v3 components as the foundation for all UI elements. Before writing any component code:

1. Fetch the HeroUI v3 LLM reference to understand available components and their APIs:
   - Use `WebFetch` to read `https://heroui.com/docs/react/getting-started/llms-txt` for a full overview
   - Use `WebFetch` to read `https://heroui.com/docs/react/getting-started/llms-full.txt` for complete component API documentation
2. If an MCP tool `heroui-migration` is available, use `get_component_migration_guides` and `list_component_migration_guides` to check for relevant component guides
3. Use HeroUI v3 compound component patterns (e.g., `Card.Header`, `Card.Content`, `Card.Footer`)
4. Use `onPress` instead of `onClick` for HeroUI interactive components
5. HeroUI v3 does NOT require a Provider wrapper — components work directly

### Component Implementation

Follow these patterns based on where the component belongs:

**Shared UI components** go in `packages/ui/src/`:
- Create a folder: `packages/ui/src/<Category>/<ComponentName>/`
- Files: `<ComponentName>.tsx` and `<ComponentName>.stories.tsx`
- Category examples: `Branding/`, `Icons/`, `Layout/`, `Navigation/`, `Display/`, `Feedback/`

**App-specific components** go in `apps/web/src/components/`:
- Create a folder: `apps/web/src/components/<category>/<component-name>/`
- Files: `<ComponentName>.tsx` and `<ComponentName>.stories.tsx`
- Category examples: `actions/`, `display/`, `feedback/`, `forms/`, `input/`, `modules/`, `navigation/`, `views/`

### MANDATORY: Use Heroicons for Icons

All icons MUST use Heroicons via `@heroicons/react`. Do not use other icon libraries or inline SVGs.

- **Outline icons** (24px): `import { IconName } from "@heroicons/react/24/outline"`
- **Solid icons** (20px): `import { IconName } from "@heroicons/react/20/solid"`
- Browse available icons at https://heroicons.com/

### MANDATORY: Internationalize All Visible Strings

All user-visible strings MUST use `react-intl`. Components must NEVER contain raw hardcoded strings for labels, placeholders, error messages, button text, headings, or any text shown to the user.

```tsx
import { useIntl } from "react-intl";

const intl = useIntl();

// Use intl.formatMessage for every visible string
intl.formatMessage({
  description: "ComponentName - What this string is for",
  defaultMessage: "The English text",
  id: "uniqueId",
})
```

This applies to: labels, placeholders, button text, headings, error messages, tooltips, aria-labels, validation messages.

### Code Style

- Use **function declarations** (not arrow functions) for components
- Define a `<ComponentName>Props` interface for all props
- Use `import type` for type-only imports
- Use Tailwind CSS 4 utility classes for styling
- Use `clsx()` for conditional class composition
- Explicit return types on exported functions
- Line length: 120 chars max
- PascalCase file and component names

### Example Component Pattern

```tsx
import { Button } from "@heroui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import type { ReactElement } from "react";
import { useIntl } from "react-intl";

export interface MyComponentProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export function MyComponent({ variant = "primary", className }: MyComponentProps): ReactElement {
  const intl = useIntl();

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <h2 className="text-lg font-semibold">
        {intl.formatMessage({
          description: "MyComponent - Page title",
          defaultMessage: "Welcome",
          id: "myComp.title",
        })}
      </h2>
      <Button
        color={variant === "primary" ? "primary" : "default"}
        startContent={<UserIcon className="size-5" />}
        onPress={() => console.log("pressed")}
      >
        {intl.formatMessage({
          description: "MyComponent - Action button label",
          defaultMessage: "Get Started",
          id: "myComp.action",
        })}
      </Button>
    </div>
  );
}
```

### MANDATORY: Create a Storybook Story

Every new component MUST have a co-located `.stories.tsx` file. Follow this pattern:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MyComponent as Component } from "./MyComponent";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "<Category>/<ComponentName>",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default prop values
  },
};

// Add variant stories for each meaningful state
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
```

For interactive components, add play functions for component testing:

```tsx
import { expect } from "storybook/test";

export const WithInteraction: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("my-component__button"));
    await expect(canvas.getByText("Expected text")).toBeInTheDocument();
  },
} satisfies Story;
```

### After Creating Files

1. Run `pnpm generate:exports` to regenerate barrel exports
2. Run `pnpm lint:fix` to ensure code quality
3. Run `pnpm test` to verify tests pass (if play functions were added)
4. Start Storybook with `pnpm storybook` and verify the story renders correctly

## Checklist

- [ ] Fetched HeroUI v3 docs before writing component code
- [ ] Used HeroUI v3 components where applicable
- [ ] Used Heroicons (`@heroicons/react`) for all icons
- [ ] All visible strings use `intl.formatMessage()` from `react-intl` (no raw strings)
- [ ] Created component with proper Props interface and function declaration
- [ ] Used Tailwind CSS 4 utilities and `clsx()` for styling
- [ ] Created co-located `.stories.tsx` file with `tags: ["autodocs"]`
- [ ] Added stories for all meaningful component states/variants
- [ ] Added play functions for interactive components
- [ ] Ran `pnpm generate:exports` to update barrel files
- [ ] Ran `pnpm lint:fix`
- [ ] Verified story renders in Storybook
