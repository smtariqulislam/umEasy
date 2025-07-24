import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TractionIssueFrom from "./TractionIssueFrom";

const TractionIssueAdd = ({ fileId }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-header btn-animation text-primary"
        onClick={() => openModal()}
      >
        <AiOutlinePlusCircle size={36} />
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-sm md:max-w-screen-sm space-y-4 border bg-white rounded-lg p-5">
                <TractionIssueFrom
                  defaultValues={{
                    issueId: "",
                    title: "",
                    userId: "",
                    note: "",
                    fileId: fileId,
                    issueStatus: "Open",
                    departmentId: "",
                    quarter: "",
                  }}
                  closeModal={closeModal}
                  path="IssueVto/create"
                  titleText="Add Traction Issue"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TractionIssueAdd;
