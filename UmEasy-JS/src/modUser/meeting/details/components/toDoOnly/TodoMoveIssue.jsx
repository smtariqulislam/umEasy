import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDeleteData } from "../../../../../hooks/dataApi";
import DialogBody from "../../../../../components/button/DialogBody";

const TodoMoveIssue = ({
  path,
  action = () => {},
  btnClass = "btn-umojayellow w-30 h-10",
  size = 24,
}) => {
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully added issue!");
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
        <AiOutlineCloudDownload size={size} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Add issue?"
      />
    </>
  );
};

export default TodoMoveIssue;
