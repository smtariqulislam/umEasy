import DeleteSmallButton from "../../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../../components/Error";
import { HashLoading } from "../../../../../../components/Loading";
import { useGetData } from "../../../../../../hooks/dataApi";
import GoalEdit from "./GoalEdit";

const GoalList = ({ status, id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("coreValue", `/tractionOneYearPlanGoal/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid gap-1">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center rounded-md cursor-pointer text-sm text-black"
          >
            <div className="flex">
              {i + 1}.{item.goal}
            </div>
            <div className="flex space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <GoalEdit id={item.goalId} />
                  <DeleteSmallButton
                    path={`/tractionOneYearPlanGoal/delete/${item.goalId}`}
                    action={refetch}
                  />
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoalList;
