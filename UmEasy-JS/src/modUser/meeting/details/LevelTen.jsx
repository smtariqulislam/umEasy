import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import RocksList from "./components/rocks/RocksList";
import HeadlineList from "./components/headline/HeadlineList";
import ToDoList from "./components/toDoOnly/ToDoList";
import IssueList from "./components/issue/IssueList";
import ScoreCardList from "./components/scoreCard/ScoreCardList";

const LevelTen = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", `/LevelTen/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl lg:text-lg font-semibold lg:text-bold text-gray-600 capitalize">
            Level 10
          </h2>
          <h3 className="text-xl lg:text-2xl font-bold lg:text-bold text-umojablue capitalize">
            {list.data.meetingName}{" "}
            <span className="text-umojablue">
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

      <ScoreCardList
        issues={list.data.scoreCards}
        id={list.data.meetingId}
        refetch={refetch}
      />
      <RocksList
        rocks={list.data.rocks}
        id={list.data.meetingId}
        refetch={refetch}
      />
      <HeadlineList
        headline={list.data.headline}
        id={list.data.meetingId}
        refetch={refetch}
      />
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

export default LevelTen;
