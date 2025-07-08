import { Button, addToast } from "@heroui/react";
import { CommonDecorator, ToastDecorator } from "@package/storybook";
import type { StoryObj } from "@storybook/react-vite";
import { useIntl } from "react-intl";
import { PwaUpdateDialogProps } from "./PwaUpdateDialog";

const meta = {
  title: "Feedback/Progressive Web App",
  decorators: [CommonDecorator, ToastDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UpdateDialog: Story = {
  render: () => {
    const intl = useIntl();
    return (
      <Button
        onPress={() =>
          addToast(
            PwaUpdateDialogProps(
              intl,
              "App",
              () => console.log("onClose"),
              () => console.log("onUpdate")
            )
          )
        }
      >
        Show Toast
      </Button>
    );
  },
};
