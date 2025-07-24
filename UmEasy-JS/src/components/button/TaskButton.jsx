/* eslint-disable react/prop-types */
import { AiOutlineFileText } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TaskButton = ({ path, btnColor = "btn-umojayellow" }) => {
  const navigate = useNavigate();
  return (
    <button className={btnColor + " w-10 h-10"} onClick={() => navigate(path)}>
      <AiOutlineFileText size={24} />
    </button>
  );
};

export default TaskButton;
