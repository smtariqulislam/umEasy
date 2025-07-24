/* eslint-disable react/prop-types */
import { useState } from "react";
import TodoClick from "../toDoOnly/TodoClick";
import IssueAdd from "./IssueAdd";
import IssueEdit from "./IssueEdit";
import IssueMoveTodo from "./IssueMoveTodo";
import { ListCol } from "../../../../../components/ListColWithHeader";
import DeleteButton from "../../../../../components/button/DeleteButton";
import RamdomButton from "../../../../../components/button/RamdomButton";

const IssueList = ({ id, issues, refetch }) => {
  const [query, setQuery] = useState("");

  const departmentName = [...new Set(issues.map((x) => x.departmentName))];

  const displayData =
    issues.length > 0
      ? issues.filter((item) =>
          query
            ? item.departmentName.toLowerCase() === query.toLowerCase()
            : true
        )
      : [];

  const [completed, setCompleted] = useState({});

  const handleToggleComplete = (todoId) => {
    setCompleted((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between px-0 py-2 items-center">
          <h1 className="text-xl lg:text-base font-bold lg:text-semibold text-gray-600 capitalize">
            Issue List
          </h1>
          <IssueAdd id={id} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <RamdomButton data={departmentName} action={setQuery} />
        </div>
        <div className="list-wrapper mt-2">
          {displayData.length > 0 &&
            displayData.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-7 list-body p-4 border rounded-lg shadow-md bg-white "
              >
                <div className="col-span-3 flex items-center space-x-4">
                  <TodoClick
                    id={item.issueId}
                    onClick={() => handleToggleComplete(item.issueId)}
                    path="/issue/ClickStatus"
                    currentStatus={item.status}
                  />
                  <ListCol
                    label="Title:"
                    value={item.title}
                    className={`${
                      item.status === "Done" ? "line-through" : ""
                    } text-sm`}
                  />
                </div>
                <ListCol label="Full Name:" value={item.fullName} />
                <ListCol label="Department:" value={item.department} />
                <ListCol label="Issue Status " value={item.status} />
                <div className="flex justify-end space-x-2">
                  <IssueMoveTodo
                    action={refetch}
                    path={`/issue/MoveTodo/${item.issueId}`}
                    btnClass="btn-success w-9 h-9"
                  />
                  <IssueEdit id={item.issueId} btnClass="btn-sky w-9 h-9" />
                  <DeleteButton
                    action={refetch}
                    path={`/issue/delete/${item.issueId}`}
                    btnClass="btn-danger w-9 h-9"
                  />
                  {/* <StatusButton
                    path={`/issue/status/${item.issueId}`}
                    action={refetch}
                    status={item.status}
                  /> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default IssueList;
