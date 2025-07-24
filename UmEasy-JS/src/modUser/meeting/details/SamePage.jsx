import { Link, useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { format } from "date-fns";
import ToDoList from "./components/toDoOnly/ToDoList";
import IssueList from "./components/issue/IssueList";

const SamePage = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", `/samePage/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl lg:text-lg font-bold lg:text-bold text-gray-600 capitalize">
            Some page
          </h1>
          <h3 className="text-xl lg:text-2xl font-bold lg:text-bold text-umojablue capitalize">
            {list.data.meetingName}{" "}
            <span className="text-umojayellow">
              ({format(new Date(list.data.meetingDate), "dd/MMM/yyyy")}{" "}
              {list.data.timeToStart})
            </span>
          </h3>
        </div>
        <div>
          <Link
            to={`/meeting/join/${list.data.meetingId}`}
            className="btn-success w-20 h-10"
          >
            <p>Join</p>
          </Link>
        </div>
      </div>

      <ToDoList
        todo={list.data.todo}
        id={list.data.meetingId}
        refetch={refetch}
      />
      <IssueList
        issues={list.data.issues}
        id={list.data.meetingId}
        refetch={refetch}
      />
    </div>
  );
};

export default SamePage;
