/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const StatusButton = ({ path, action, status }) => {
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully updated!");
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
        className={`border px-2 py-1 rounded-lg text-sm ${
          status === "Draft" ? "bg-red-500 text-white" : "bg-green-500 "
        } `}
        onClick={() => {
          openModal();
        }}
      >
        {status}
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText={`Are you sure you want to ${
          status === "Sovled" ? "Final" : "Sovled"
        }? This will change status immediately.`}
      />
    </>
  );
};

export default StatusButton;
