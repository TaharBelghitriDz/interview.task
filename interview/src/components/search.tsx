import { UserType, useFetch, useInput } from "../lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon } from "@geist-ui/icons";
import {
  Input,
  ModalBody,
  ModalContentProps,
  Spacer,
  Spinner,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { ModalComponent } from "./modal";
import { useEffect, useState } from "react";

const Search = () => {
  const searchInput = useInput("");
  const fetch = useFetch();
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

  useEffect(() => {
    if (searchInput.value !== "") fetch.call(searchInput.value);
  }, [searchInput.value]);

  return (
    <div className="w-full relative flex flex-col justify-center space-y-2  ">
      <ModalComponent
        disclosure={disclosure}
        content={{ children: modalContent, className: "rounded-3xl" }}
      />
      <Input
        endContent={<SearchIcon />}
        variant="flat"
        radius="lg"
        {...searchInput.props}
        placeholder="Search"
      />

      <AnimatePresence>
        {fetch.loading ? (
          <Spinner className="pt-4" />
        ) : (
          fetch.data &&
          searchInput.value !== "" && (
            <motion.div
              initial={{ height: "0px", opacity: 0 }}
              className=" h-auto overflow-hidden grid grid-cols-3 grid-row-3 grid-ce gap-5 w-full mt-2 bg-zinc-800 p-3 rounded-xl justify-center items-center"
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: "0px", opacity: 0 }}
            >
              {fetch.data
                .map((e) => e.users)
                .flat(1)
                .map((e, i) => (
                  <motion.div key={i}>
                    <User
                      onClick={() => onSelect(e)}
                      className="cursor-pointer"
                      name={e.name}
                      avatarProps={{
                        src: e.cover,
                      }}
                    />
                  </motion.div>
                ))
                .splice(0, 12)}
              {fetch.data.map((e) => e.users).flat(1).length == 0 && (
                <span className="w-full">Nothing Found</span>
              )}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
