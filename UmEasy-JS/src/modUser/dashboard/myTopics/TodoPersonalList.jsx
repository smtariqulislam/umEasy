import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import DuplicateButton from "../../../components/button/DuplicateButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { format } from "date-fns";
import ToDoPersonalEdit from "../personalToDo/ToDoPersonalEdit";

const TodoPersonalList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userMeeting", "/TodoPersonal/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="list-wrapper overflow-y-auto max-h-96">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div key={i} className=" max-h-96">
            <div className="grid grid-cols-2 list-body">
              <div className="flex text-lg space-x-2 ">
                <span className="">{item.title}, </span>
                {/* <span className="">{item.fullName}, </span> */}
                <span className="">
                  {item.dueDate !== "1980-12-31T00:00:00"
                    ? format(new Date(item.dueDate), "dd/MMM/yyyy")
                    : ""}
                </span>
              </div>
              <div className="flex justify-end space-x-2">
                <ToDoPersonalEdit id={item.todoId} />
                {/* <DuplicateButton
                  action={refetch}
                  path={`/todo/duplicate/${item.todoId}`}
                /> */}
                <DeleteButton
                  action={refetch}
                  path={`/TodoPersonal/delete/${item.todoId}`}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoPersonalList;
