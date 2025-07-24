import {  useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";

import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const DeleteTitleButton = ({ path, action }) => {
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully deleted!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
      action();
    }
  };

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
        className="btn-danger w-full h-10"
        onClick={() => {
          openModal();
        }}
      >
       Delete
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to delete? This item will be deleted immediately. You can't undo this action."
      />
    </>
  );
};

export default DeleteTitleButton;
