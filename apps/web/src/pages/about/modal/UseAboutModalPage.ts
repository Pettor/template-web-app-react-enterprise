import { useNavigate } from "react-router-dom";
import { useAboutPage } from "../UseAboutPage";
import type { AboutModalProps } from "~/components/feedback/about-modal/AboutModal";

export function useAboutModalPage(serverVersion: string): AboutModalProps {
  const navigate = useNavigate();
  const aboutProps = useAboutPage(serverVersion);

  function handleOnClose(): void {
    navigate(-1);
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
