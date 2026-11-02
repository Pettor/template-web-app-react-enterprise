import { Button, toast } from "@heroui/react";
import { CommonDecorator, ToastDecorator } from "@package/storybook";
import type { StoryObj } from "@storybook/react-vite";
import { useIntl } from "react-intl";
import { expect, within } from "storybook/test";
import { SyncOutdatedDialogProps } from "./SyncOutdatedDialog";

const meta = {
  title: "Feedback/Sync Outdated",
  tags: ["autodocs"],
  decorators: [CommonDecorator, ToastDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OutdatedDialog: Story = {
  render: () => {
    const intl = useIntl();
    return (
      <Button
        onPress={() => {
          const [msg, opts] = SyncOutdatedDialogProps(
            intl,
            "App",
            () => console.log("onClose"),
            () => console.log("onUpdate")
          );
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
    await expect(await body.findByText(/Sync paused: update App to keep syncing/i)).toBeInTheDocument();
    await expect(await body.findByRole("button", { name: /update/i })).toBeInTheDocument();
  },
};
