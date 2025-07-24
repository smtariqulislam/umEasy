import { useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import { HiDocumentDuplicate } from "react-icons/hi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const DuplicateButton = ({ path, action }) => {
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully duplicate!");
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
        className="btn-yam w-10 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <HiDocumentDuplicate size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Duplicate?"
      />
    </>
  );
};

export default DuplicateButton;
