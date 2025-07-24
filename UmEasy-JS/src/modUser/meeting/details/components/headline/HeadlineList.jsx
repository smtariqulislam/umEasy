import { useState } from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import { ListCol } from "../../../../../components/ListColWithHeader";
import TodoClick from "../toDoOnly/TodoClick";
import TodoMoveIssue from "../toDoOnly/TodoMoveIssue";
import HeadlineAdd from "./HeadlineAdd";
import HeadlineEdit from "./HeadlineEdit";
import RamdomButton from "../../../../../components/button/RamdomButton";

const HeadlineList = ({ id, headline, refetch }) => {
  const [query, setQuery] = useState("");

  const departmentName = [...new Set(headline.map((x) => x.departmentName))];
  const [completed, setCompleted] = useState({});

  const handleToggleComplete = (headlineId) => {
    setCompleted((prev) => ({
      ...prev,
      [headlineId]: !prev[headlineId],
    }));
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between px-0 py-2 items-center">
          <h1 className="text-xl lg:text-base font-bold lg:text-semibold text-gray-600 capitalize">
            Headline List
          </h1>
          <HeadlineAdd id={id} />
        </div>

        <div className="flex gap-2 flex-wrap">
          <RamdomButton data={departmentName} action={setQuery} />
        </div>
        <div className="list-wrapper mt-2">
          {headline.length > 0 &&
            headline.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-6 list-body p-4 border rounded-lg shadow-md bg-white "
              >
                <div className="col-span-3 flex items-center space-x-4">
                  <TodoClick
                    id={item.headlineId}
                    onClick={() => handleToggleComplete(item.headlineId)}
                    path="/Headline/ClickStatus"
                    currentStatus={item.status}
                  />
                  <ListCol
                    label="Title:"
                    value={item.title}
                    className={`${
                      item.status === "Reviewed" ? "line-through" : ""
                    } text-sm`}
                  />
                </div>
                <ListCol label="Status:" value={item.status} />
                <ListCol label="Full Name:" value={item.fullName} />
                <div className="flex justify-end space-x-2">
                  <TodoMoveIssue
                    action={refetch}
                    path={`/Headline/MoveIssue/${item.headlineId}`}
                    btnClass="btn-success w-9 h-9"
                  />
                  <HeadlineEdit
                    id={item.headlineId}
                    btnClass="btn-sky w-9 h-9"
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/Headline/delete/${item.headlineId}`}
                    btnClass="btn-danger w-9 h-9"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HeadlineList;
