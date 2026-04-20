import type { ReactElement } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ContainerDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { InputField } from "./InputField";

interface WrapperProps {
  label?: string;
  placeholder?: string;
  withIcon?: boolean;
}

function InputFieldWrapper({ label, placeholder, withIcon }: WrapperProps): ReactElement {
  const form = useForm({
    defaultValues: { email: "" },
  });

  return (
    <form.Field name="email">
      {(field) => (
        <InputField
          field={field}
          label={label}
          placeholder={placeholder}
          startContent={withIcon ? <EnvelopeIcon className="h-5 w-5" /> : undefined}
        />
      )}
    </form.Field>
  );
}

const meta: Meta<typeof InputFieldWrapper> = {
  component: InputFieldWrapper,
  title: "Input/Input Field",
  tags: ["autodocs"],
  decorators: [ContainerDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    withIcon: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: "Type something…",
  },
};
