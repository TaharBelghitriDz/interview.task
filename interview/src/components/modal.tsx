import {
  ModalContent,
  useDisclosure,
  Modal,
  ModalContentProps,
  UseDisclosureProps,
} from "@nextui-org/react";

export const ModalComponent = (props: {
  disclosure: UseDisclosureProps;
  content: ModalContentProps;
}) => {
  const { isOpen, onOpenChange } = useDisclosure(props.disclosure);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      hideCloseButton
    >
      <ModalContent {...props.content} />
    </Modal>
  );
};
