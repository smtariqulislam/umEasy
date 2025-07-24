import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import HeadlineFrom from "./HeadlineFrom";
import { MdViewHeadline } from "react-icons/md";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";


const HeadlineEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/Headline/Details/${id}`);

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
                    headlineId: list.data.headlineId,
                    title: list.data.title,
                    userId: list.data.userId,
                    meetingId: list.data.meetingId,
                    note: list.data.note,
                  }}
                  path="Headline/update"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HeadlineEdit;
