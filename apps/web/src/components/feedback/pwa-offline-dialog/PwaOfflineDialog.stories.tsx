import { addToast, Button } from "@heroui/react";
import { CommonDecorator, ToastDecorator } from "@package/storybook";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useIntl } from "react-intl";
import { PwaOfflineDialogProps } from "./PwaOfflineDialog";

const meta: Meta = {
  title: "Feedback/Progressive Web App",
  decorators: [CommonDecorator, ToastDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OfflineDialog: Story = {
  render: () => {
    const intl = useIntl();
    return (
      <Button onPress={() => addToast(PwaOfflineDialogProps(intl, () => console.log("onClose")))}>Show Toast</Button>
    );
  },
};
