import { useState } from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import RamdomButton from "../../../../../components/button/RamdomButton";
import { ListCol } from "../../../../../components/ListColWithHeader";
import TodoMoveIssue from "../toDoOnly/TodoMoveIssue";
import RocksAdd from "./RocksAdd";
import RocksEdit from "./RocksEdit";
import { format } from "date-fns";

const RocksList = ({ id, rocks, refetch }) => {
  const [query, setQuery] = useState("");

  const departmentName = [...new Set(rocks.map((x) => x.departmentName))];
  const displayData =
    rocks.length > 0
      ? rocks.filter((item) =>
          query
            ? item.departmentName.toLowerCase() === query.toLowerCase()
            : true
        )
      : [];
  console.log(rocks);
  return (
    <div className="">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-base font-bold lg:text-semibold text-gray-600 capitalize">
          Rocks Review List
        </h1>

        <RocksAdd id={id} />
      </div>

      <div className="flex gap-2 flex-wrap">
        <RamdomButton data={departmentName} action={setQuery} />
      </div>
      <div className="list-wrapper mt-2">
        {displayData.length > 0 &&
          displayData.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-9 list-body p-4 border rounded-lg shadow-md bg-white "
            >
              <div className="col-span-3 flex items-center space-x-4">
                <ListCol
                  label="Title:"
                  value={item.title}
                  className="text-sm"
                />
              </div>
              <ListCol label="Full Name:" value={item.fullName} />
              <ListCol label="Department:" value={item.department} />
              <ListCol
                label="Status:"
                value={item.status}
                className={
                  item.status === "On-Track" ? "text-green-600" : "text-red-600"
                }
              />
              <ListCol label="Type:" value={item.rockType} />
              <ListCol
                label="Due Date:"
                value={format(new Date(item.dueDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                <TodoMoveIssue
                  action={refetch}
                  path={`/MeetingRocks/MoveIssue/${item.rocksId}`}
                  btnClass="btn-success w-9 h-9"
                />
                <RocksEdit id={item.rocksId} btnClass="btn-sky w-9 h-9" />
                <DeleteButton
                  action={refetch}
                  path={`/MeetingRocks/delete/${item.rocksId}`}
                  btnClass="btn-danger w-9 h-9"
                />
              </div>
            </div>
          ))}

        {/* <div className="list-footer">
					<div className="col-span-10"></div>
					<div className="flex justify-center">
						<span className="font-semibold">TOTAL : {list.data.length}</span>
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default RocksList;
