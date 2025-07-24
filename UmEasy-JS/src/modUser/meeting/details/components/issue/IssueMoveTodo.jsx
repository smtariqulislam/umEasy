import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import toast from "react-hot-toast";
import DialogBody from "../../../../../components/button/DialogBody";
import { useDeleteData } from "../../../../../hooks/dataApi";

const IssueMoveTodo = ({
  path,
  action,
  btnClass = "btn-umojayellow w-10 h-10",
  size = 24,
}) => {
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
        className={btnClass}
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlineUnorderedList size={size} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Add Todo?"
      />
    </>
  );
};

export default IssueMoveTodo;
