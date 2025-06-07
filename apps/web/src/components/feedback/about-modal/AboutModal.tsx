import type { ReactElement } from "react";
import type { AboutDetailsProps } from "../about-details/AboutDetails";
import { AboutDetails } from "../about-details/AboutDetails";
import { Modal, ModalBody, ModalContent, ModalHeader, Spacer, type ModalProps } from "@heroui/react";
import { useIntl } from "react-intl";

export interface AboutModalProps {
  modalProps: Omit<ModalProps, "children">;
  aboutDetailsProps: AboutDetailsProps;
}

export function AboutModal({ modalProps, aboutDetailsProps }: AboutModalProps): ReactElement {
  const intl = useIntl();

  return (
    <Modal {...modalProps}>
      <ModalContent>
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
          <AboutDetails {...aboutDetailsProps} />
          <Spacer y={4} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
