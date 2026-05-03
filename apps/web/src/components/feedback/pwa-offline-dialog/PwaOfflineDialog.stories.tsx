import { toast, Button } from "@heroui/react";
import { CommonDecorator, ToastDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useIntl } from "react-intl";
import { expect, within } from "storybook/test";
import { PwaOfflineDialogProps } from "./PwaOfflineDialog";

const meta: Meta = {
  title: "Feedback/PWA Offline",
  decorators: [CommonDecorator, ToastDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OfflineDialog: Story = {
  render: () => {
    const intl = useIntl();
    return (
      <Button
        onPress={() => {
          const [msg, opts] = PwaOfflineDialogProps(intl, () => console.log("onClose"));
          toast(msg, opts);
        }}
      >
        Show Toast
      </Button>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Toast" }));

    const body = within(document.body);
    await expect(await body.findByText(/ready to work offline/i)).toBeInTheDocument();
  },
};
