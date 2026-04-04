import type { ReactElement } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  type ModalContainerProps,
} from "@heroui/react";
import { useIntl } from "react-intl";
import type { AboutDetailsProps } from "../about-details/AboutDetails";
import { AboutDetails } from "../about-details/AboutDetails";

export interface AboutModalProps {
  modal: {
    isOpen?: boolean;
    isDismissable?: boolean;
    size?: ModalContainerProps["size"];
    onClose?: () => void;
  };
  aboutDetails: AboutDetailsProps;
}

export function AboutModal({ modal, aboutDetails }: AboutModalProps): ReactElement {
  const intl = useIntl();

  return (
    <Modal
      isOpen={modal.isOpen}
      onOpenChange={(open) => {
        if (!open) modal.onClose?.();
      }}
    >
      <ModalBackdrop isDismissable={modal.isDismissable}>
        <ModalContainer size={modal.size}>
          <ModalDialog>
            <ModalHeader>
              <p>
                {intl.formatMessage({
                  description: "About - Title",
                  defaultMessage: "About",
                  id: "2Rm6Lp",
                })}
              </p>
            </ModalHeader>
            <ModalBody>
              <AboutDetails {...aboutDetails} />
            </ModalBody>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
}
