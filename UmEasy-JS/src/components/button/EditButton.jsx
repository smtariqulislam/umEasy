import { AiOutlineForm } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-sky w-10 h-10" onClick={() => navigate(path)}>
      <AiOutlineForm size={24} />
    </button>
  );
};

export default EditButton;
