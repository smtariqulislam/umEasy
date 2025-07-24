/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import FolderForm from "./FolderForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const FolderEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("vtofolderDetails", `/vtoFolder/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="">
      <button onClick={openModal} className="btn-sky w-10 h-10">
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
              <DialogPanel
                transition
                className="w-full max-w-screen-lg rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <FolderForm
                  defaultValues={{
                    folderId: list.data.folderId,
                    folderName: list.data.folderName,
                  }}
                  path="vtofolder/update"
                  titleText="Edit Folder Update"
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

export default FolderEdit;
