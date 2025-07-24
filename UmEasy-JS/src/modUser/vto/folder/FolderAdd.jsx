/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import FolderForm from "./FolderForm";

const FolderAdd = ({ btn = "None", show = 0 }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-between px-0 py-2 items-center">
      {btn === "Save" && show === 0 && (
        <button onClick={openModal} className="text-black flex items-center">
          <AiOutlinePlusCircle className="mr-1" />
          Create New Folder
        </button>
      )}
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-screen-lg rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <FolderForm
                  defaultValues={{
                    folderId: "",
                    folderName: "",
                  }}
                  path="vtoFolder/Create"
                  titleText="Folder Add"
                  closeModal={closeModal}
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FolderAdd;
