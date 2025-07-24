import { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";

const RocksStatus = ({ rocksId, status }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const handleSelectChange = async (event) => {
    setSubmitting(true);
    let data = { rocksId: rocksId, status: event.target.value };

    try {
      const { status } = await mutateAsync({
        path: "/MeetingRocks/StatusUpdate",
        formData: data,
      });

      if (status === 204) {
        toast.success("Update Successful");
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
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col">
        <select
          className="text-sm  font-bold rounded border-2 text-gray-600 h-14 w-40 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          onChange={handleSelectChange}
          disabled={submitting}
        >
          <option value="Todo">Todo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Discussion">Discussion</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default RocksStatus;
