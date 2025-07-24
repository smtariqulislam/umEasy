import React, { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDeleteData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const DeleteButtonFile = ({
  path,
  action = () => {},
  btnClass = "btn-danger w-10 h-10",
  size = 24,
  returnPath = "",
}) => {
  const { mutateAsync } = useDeleteData();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully deleted!");
        navigate(returnPath);
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
        bodyText="Are you sure you want to delete? This item will be deleted immediately. You can't undo this action."
      />
    </>
  );
};

export default DeleteButtonFile;
