import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import ScoreCardFrom from "./ScoreCardFrom";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ScoreCardAdd = ({ id, refetch }) => {
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
              <DialogPanel className="w-full max-w-sm md:max-w-screen-md space-y-4 border bg-white rounded-lg">
                <ScoreCardFrom
                  closeModal={closeModal}
                  defaultValues={{
                    scoreCardId: "",
                    meetingId: id,
                    particular: "",
                    departmentId: "",
                  }}
                  path="ScoreCard/create"
                  titleText="Add Score Card"
                  refetch={refetch}
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ScoreCardAdd;
