import { Button, toast } from "@heroui/react";
import { CommonDecorator, ToastDecorator } from "@package/storybook";
import type { StoryObj } from "@storybook/react-vite";
import { useIntl } from "react-intl";
import { PwaUpdateDialogProps } from "./PwaUpdateDialog";

const meta = {
  title: "Feedback/PWA Update",
  decorators: [CommonDecorator, ToastDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UpdateDialog: Story = {
  render: () => {
    const intl = useIntl();
    return (
      <Button
        onPress={() => {
          const [msg, opts] = PwaUpdateDialogProps(
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
};
