import { useState } from "react";
import toast from "react-hot-toast";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { usePostData } from "../../../../../hooks/dataApi";

const TodoClick = ({ id, onClick, path, currentStatus }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const handleClick = async () => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: { todoId: id },
      });

      if (status === 204) {
        toast.success("Update Successful");
        onClick(); // Notify parent component
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button className="w-10 h-10" onClick={handleClick} disabled={submitting}>
      {currentStatus === "Done" || currentStatus === "Reviewed" ? (
        <MdOutlineCheckBox size={24} />
      ) : (
        <MdOutlineCheckBoxOutlineBlank size={24} />
      )}
    </button>
  );
};

export default TodoClick;
