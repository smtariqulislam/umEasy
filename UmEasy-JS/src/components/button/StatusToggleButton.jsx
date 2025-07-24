import { useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const StatusToggleButton = ({ path, action, status, className }) => {
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
        className={`${
          status === "Draft" ? "btn-danger w-20 h-10" : "btn-success w-20 h-10"
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
          status === "Draft" ? "Final" : "Draft"
        }? This will change status immediately.`}
      />
    </>
  );
};

export default StatusToggleButton;
