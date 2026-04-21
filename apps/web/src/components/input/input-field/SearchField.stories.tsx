import { useState, type ReactElement } from "react";
import { ContainerDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchField } from "./SearchField";

interface WrapperProps {
  placeholder?: string;
  initialValue?: string;
}

function SearchFieldWrapper({ placeholder, initialValue = "" }: WrapperProps): ReactElement {
  const [value, setValue] = useState(initialValue);
  return (
    <SearchField ariaLabel="Search" value={value} onChange={setValue} placeholder={placeholder} className="w-64" />
  );
}

const meta: Meta<typeof SearchFieldWrapper> = {
  component: SearchFieldWrapper,
  title: "Input/Search Field",
  tags: ["autodocs"],
  decorators: [ContainerDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search…",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Search…",
    initialValue: "invoice",
  },
};
