import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import TodoPersonalFrom from "./TodoPersonalFrom";
import { FaPerson } from "react-icons/fa6";

const ToDoPersonalAdd = () => {
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
        <FaPerson size={40} />
        Add To Do Personal
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
                <TodoPersonalFrom
                  defaultValues={{
                    todoId: "",
                    title: "",
                    dueDate: "",
                    userId: "",
                    note: "",
                  }}
                  closeModal={closeModal}
                  path="TodoPersonal/create"
                  titleText="Add Todo Personal"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ToDoPersonalAdd;
