import { useRouter } from "@tanstack/react-router";
import { useAboutPage } from "../UseAboutPage";
import type { AboutModalProps } from "~/components/feedback/about-modal/AboutModal";

export function useAboutModalPage(serverVersion: string): AboutModalProps {
  const router = useRouter();
  const aboutProps = useAboutPage(serverVersion);

  function handleOnClose(): void {
    router.history.back();
  }

  return {
    modal: {
      size: "full",
      isDismissable: true,
      onClose: handleOnClose,
    },
    aboutDetails: aboutProps,
  };
}
