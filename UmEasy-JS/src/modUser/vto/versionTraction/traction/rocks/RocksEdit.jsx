import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlineForm } from "react-icons/ai";
import RocksFrom from "./RocksFrom";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";

// eslint-disable-next-line react/prop-types
const RocksEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/TractionRock/Details/${id}`);

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
      <button className="btn-sky w-8 h-6" onClick={() => openModal()}>
        <AiOutlineForm size={16} />
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
                <RocksFrom
                  closeModal={closeModal}
                  defaultValues={{
                    rockId: list.data.rockId,
                    fileId: list.data.fileId,
                    goalId: list.data.goalId,
                    quarter: list.data.quarter,
                    rock: list.data.rock,
                    rockOwner: list.data.rockOwner,
                    departmentId: list.data.departmentId,
                  }}
                  path="TractionRock/update"
                  btnText="Update"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RocksEdit;
