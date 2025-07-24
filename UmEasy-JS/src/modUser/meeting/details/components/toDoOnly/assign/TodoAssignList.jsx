import Error from "../../../../../../components/Error";
import { ListCol } from "../../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../../components/Loading";
import DeleteButton from "../../../../../../components/button/DeleteButton";
import { useGetData } from "../../../../../../hooks/dataApi";

const TodoAssignList = ({ todoId, meetingId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", `/TodoAssign/List/${todoId}/${meetingId}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="">
        <div className="flex justify-between px-0 py-2 items-center">
          <h1 className="text-xl lg:text-base font-bold lg:text-semibold text-gray-600 capitalize">
            Todo Assign List
          </h1>
        </div>
        <div className="list-wrapper">
          {list.data.length > 0 &&
            list.data.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-3 list-body p-4 border rounded-lg shadow-md bg-white"
              >
                <ListCol label="Full Name:" value={item.fullName} />
                <ListCol label="Assign:" value={item.status} />

                <div className="flex justify-end ">
                  <DeleteButton
                    action={refetch}
                    path={`/todoAssign/delete/${item.todoAssignId}`}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TodoAssignList;
