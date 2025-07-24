import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDeleteData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const DeleteButton = ({
  path,
  action = () => {},
  btnClass = "btn-danger w-10 h-10",
  size = 24,
  returnPath = "",
  bodyText = "Are you sure you want to delete? This item will be deleted immediately. You can't undo this action.", // Confirmation text
}) => {
  const { mutateAsync } = useDeleteData();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully deleted!");
        if (returnPath) navigate(returnPath); // Navigate if returnPath is provided
        action();
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
    }
  };

  return (
    <>
      <button
        className={btnClass}
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlineCloseCircle size={size} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText={bodyText}
      />
    </>
  );
};

export default DeleteButton;
