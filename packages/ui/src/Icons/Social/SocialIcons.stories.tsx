import type { Meta, StoryObj } from "@storybook/react-vite";
import { GithubIcon } from "./GithubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

const meta: Meta = {
  title: "Shared/Icons/Social",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Github: Story = {
  args: {
    size: "medium",
  },
  render: (args) => <GithubIcon {...args} />,
};

export const Linkedin: Story = {
  args: {
    size: "medium",
  },
  render: (args) => <LinkedInIcon {...args} />,
};
