import type { ReactElement } from "react";
import type { AboutDetailsProps } from "../about-details/AboutDetails";
import { AboutDetails } from "../about-details/AboutDetails";
import { Modal, ModalBody, ModalContent, ModalHeader, Spacer, type ModalProps } from "@heroui/react";
import { useIntl } from "react-intl";

export interface AboutModalProps {
  modal: Omit<ModalProps, "children">;
  aboutDetails: AboutDetailsProps;
}

export function AboutModal({ modal, aboutDetails }: AboutModalProps): ReactElement {
  const intl = useIntl();

  return (
    <Modal {...modal}>
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
          <AboutDetails {...aboutDetails} />
          <Spacer y={4} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
