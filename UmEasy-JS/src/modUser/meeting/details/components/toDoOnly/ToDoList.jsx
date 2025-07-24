import { useState } from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import { ListCol } from "../../../../../components/ListColWithHeader";
import { format } from "date-fns";
import ToDoAdd from "./ToDoAdd";
import TodoClick from "./TodoClick";
import TodoEdit from "./TodoEdit";
import TodoMoveIssue from "./TodoMoveIssue";
import TodoAssignAdd from "./assign/TodoAssignAdd";

const ToDoList = ({ id, todo, refetch }) => {
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
            Todo List
          </h1>
          <ToDoAdd id={id} />
        </div>
        <div className="list-wrapper">
          {todo.length > 0 &&
            todo.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-7 list-body px-4 py-1 border rounded-lg shadow-md bg-white"
              >
                <div className="col-span-2 flex items-center space-x-4">
                  <TodoClick
                    id={item.todoId}
                    onClick={() => handleToggleComplete(item.todoId)}
                    path="/todo/ClickStatus"
                    currentStatus={item.status}
                  />
                  <ListCol
                    label="Title:"
                    value={item.title}
                    className={`${item.status === "Done" ? "line-through" : ""
                      } text-sm`}
                  />
                </div>
                <ListCol label="Full Name:" value={item.fullName} />
                <ListCol label="Department:" value={item.department} />
                <ListCol label="Status:" value={item.status} />
                <ListCol
                  label="Due Date:"
                  value={
                    item.dueDate !== "1980-12-31T00:00:00"
                      ? format(new Date(item.dueDate), "dd/MMM/yyyy")
                      : ""
                  }
                />
                <div className="flex justify-end space-x-2">
                  <TodoAssignAdd
                    todoId={item.todoId}
                    btnClass="btn-success w-9 h-9"
                  />
                  <TodoMoveIssue
                    action={refetch}
                    path={`/todo/MoveIssue/${item.todoId}`}
                    btnClass="btn-umojayellow w-9 h-9"
                  />
                  <TodoEdit id={item.todoId} btnClass="btn-sky w-9 h-9" />
                  <DeleteButton
                    action={refetch}
                    path={`/todo/delete/${item.todoId}`}
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

export default ToDoList;
