/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import RocksList from "../details/components/rocks/RocksList";
import HeadlineList from "../details/components/headline/HeadlineList";
import ToDoList from "../details/components/toDoOnly/ToDoList";
import IssueList from "../details/components/issue/IssueList";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

function Agenda({ showCard }) {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", `/levelTen/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  switch (showCard) {
    case "SCORECARD":
      return <div>{showCard}</div>;
    case "ROCK REVIEW":
      return <RocksList rocks={list.data.rocks} id={id} refetch={refetch} />;
    case "HEADLINES":
      return (
        <HeadlineList headline={list.data.headline} id={id} refetch={refetch} />
      );
    case "TO-DO LIST":
      return <ToDoList todo={list.data.todo} id={id} refetch={refetch} />;
    case "IDS":
      return <IssueList issues={list.data.issues} id={id} refetch={refetch} />;
    default:
  }
}

export default Agenda;
