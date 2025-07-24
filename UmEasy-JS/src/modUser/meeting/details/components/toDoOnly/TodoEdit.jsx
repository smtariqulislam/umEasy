/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";
import TodoFrom from "./TodoFrom";
import { AiOutlineForm } from "react-icons/ai";

const TodoEdit = ({ id, btnClass = "btn-sky w-10 h-10", size = 24 }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/todo/Details/${id}`);

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
      <button className={btnClass} onClick={() => openModal()}>
        <AiOutlineForm size={size} />
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
                <TodoFrom
                  closeModal={closeModal}
                  defaultValues={{
                    todoId: list.data.todoId,
                    title: list.data.title,
                    dueDate:
                      list.data.dueDate !== "1980-12-31T00:00:00"
                        ? list.data.dueDate
                        : new Date(),
                    userId: list.data.userId,
                    status: list.data.status,
                    note: list.data.note,
                    departmentId: list.data.departmentId,
                  }}
                  path="Todo/update"
                  titleText="Edit To Do"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TodoEdit;
