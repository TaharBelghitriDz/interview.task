import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  ModalBody,
  ModalContentProps,
  Spacer,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { ModalComponent } from "./modal";
import { DataType, UserType } from "../lib/hooks";
import { AnimatePresence, motion } from "framer-motion";

const Collapse = (props: { reports: DataType }) => {
  const disclosure = useDisclosure();

  const [modalContent, setModalContent] =
    useState<ModalContentProps["children"]>();

  const onSelect = (user: UserType) => {
    setModalContent(() => (
      <ModalBody className="p-5 ">
        <div className="flex flex-col items-start justify-start space-y-2 text-sm">
          <User
            name={user.name}
            description={"departmnetId id :" + user.departmnetId}
            avatarProps={{
              src: user.cover,
            }}
          />
          <Spacer className="h-5" />
          <span> birthday : {user.age.split("T")[0]} </span>
          <span> filesId : {user.filesId}</span>
          <span> parentId : {user.parentId}</span>
        </div>
      </ModalBody>
    ));
    disclosure.onOpen();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
      >
        <ModalComponent
          disclosure={disclosure}
          content={{ children: modalContent, className: "rounded-3xl" }}
        />
        <Accordion
          isCompact
          className=" flex flex-col w-full rounded-3xl "
          defaultExpandedKeys={["0"]}
        >
          {props.reports.map((e, i) => (
            <AccordionItem
              key={i.toString()}
              aria-label={e.title}
              title={e.title}
              className="rounded-3xl"
              classNames={{ base: "rounded-3xl" }}
            >
              <div className="flex flex-col items-start space-y-5 py-3">
                <span className="text-xs text-white/80"> {e.text}</span>
                <AvatarGroup isBordered max={10} className="p-2">
                  {e.users.map((e, i) => (
                    <Avatar
                      key={i}
                      src={e.cover}
                      alt={e.cover}
                      size="sm"
                      onClick={() => onSelect(e)}
                    />
                  ))}
                </AvatarGroup>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </AnimatePresence>
  );
};

export default Collapse;
