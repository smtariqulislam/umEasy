import HeadlineAdd from "./headline/HeadlineAdd";
import IssueAdd from "./issue/IssueAdd";
import IssueVtoAdd from "./issueVto/IssueVtoAdd";
import ToDoPersonalAdd from "./personalToDo/ToDoPersonalAdd";
import ToDoAdd from "./toDoOnly/ToDoAdd";

const TopMenu = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <ToDoAdd />
      <ToDoPersonalAdd />
      <IssueAdd />
      <HeadlineAdd />
      <IssueVtoAdd />
    </div>
  );
};

export default TopMenu;
