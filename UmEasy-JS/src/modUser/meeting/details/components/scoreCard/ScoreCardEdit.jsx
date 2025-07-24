/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlineForm } from "react-icons/ai";
import ScoreCardFrom from "./ScoreCardFrom";

const ScoreCardEdit = ({ item, refetch, btnClass = "btn-sky w-10 h-10" }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className={btnClass} onClick={() => openModal()}>
        <AiOutlineForm size={24} />
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
                    scoreCardId: item.scoreCardId,
                    meetingId: item.meetingId,
                    particular: item.particular,
                    departmentId: item.departmentId,
                  }}
                  path="ScoreCard/updateMain"
                  titleText="Edit Score Card"
                  btnText="Update"
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

export default ScoreCardEdit;
