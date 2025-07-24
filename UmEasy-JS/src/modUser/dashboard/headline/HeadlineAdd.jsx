import  { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import HeadlineFrom from "./HeadlineFrom";
import { MdViewHeadline } from "react-icons/md";

const HeadlineAdd = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn btn-sm bg-umojablue" onClick={() => openModal()}>
        <MdViewHeadline size={40} />
        Add Headline
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
                <HeadlineFrom
                  closeModal={closeModal}
                  defaultValues={{
                    title: "",
                    meetingId: "",
                    userId: "",
                    note: "",
                  }}
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HeadlineAdd;
