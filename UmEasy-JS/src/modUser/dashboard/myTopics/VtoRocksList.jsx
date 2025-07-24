import DeleteButton from "../../../components/button/DeleteButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const VtoRocksList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userMeeting", "/TractionRock/ListUser");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  

  return (
    <div className="list-wrapper overflow-y-auto max-h-96">
      <div className="grid gap-2">
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className=" max-h-96">
              <div className="grid grid-cols-2 list-body">
                <div className="flex text-lg space-x-2 ">
                  <span className="">{item.rock}, </span>
                  <span className="">{item.goal}, </span>
                  <span className="">{item.rockOwnerName}, </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <DeleteButton
                    action={refetch}
                    path={`/TractionRock/delete/${item.rockId}`}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VtoRocksList;
