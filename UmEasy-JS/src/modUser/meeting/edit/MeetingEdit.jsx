import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { AiOutlineForm } from "react-icons/ai";
import MeetingUpdate from "./MeetingUpdate";

const MeetingEdit = ({ id, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("meetingDetails", `/meeting/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn-sky w-10 h-10" onClick={() => openModal()}>
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
              <DialogPanel className="w-full max-w-sm md:max-w-screen-lg space-y-4 border bg-white rounded-lg">
                <MeetingUpdate data={list.data} refetch={refetch} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MeetingEdit;
