/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiDocumentDuplicate } from "react-icons/hi";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import DuplicateMeetingAddForm from "./DuplicateMeetingForm";

const DuplicateMeetingAdd = ({ title, btn = "None", show = 0, path }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-between px-0 py-2 items-center">
      <button
        className="btn-yam w-10 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <HiDocumentDuplicate size={24} />
      </button>
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
                <DuplicateMeetingAddForm closeModal={closeModal} path={path} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DuplicateMeetingAdd;
