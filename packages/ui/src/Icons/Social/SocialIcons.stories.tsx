import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GithubIcon } from "./GithubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

const meta: Meta = {
  title: "Shared/Icons/Social",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function render(children?: ReactNode) {
  return <div className="h-8 w-8">{children}</div>;
}

export const Github: Story = {
  render: (args) => render(<GithubIcon {...args} />),
};

export const Linkedin: Story = {
  render: (args) => render(<LinkedInIcon {...args} />),
};
