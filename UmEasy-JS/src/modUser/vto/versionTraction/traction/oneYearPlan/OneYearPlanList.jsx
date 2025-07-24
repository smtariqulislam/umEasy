import DeleteButton from "../../../../../components/button/DeleteButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import { format } from "date-fns";
import OneYearPlanEdit from "./OneYearPlanEdit";
import GoalList from "./goal/GoalList";
import GoalAdd from "./goal/GoalAdd";

const OneYearPlanList = ({ id, status }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("tractionOneYearPlan", `/tractionOneYearPlan/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="list-wrapper">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div key={i} className="text-sm text-black grid gap-1">
            <div>
              Future Date: {format(new Date(item.futureDate), "dd/MMM/yyyy")}{" "}
            </div>
            <div>Revenue: {item.revenue}</div>
            <div>Profit: {item.profit}</div>
            <div>Measurables: {item.measurables}</div>
            <div className="flex justify-end space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <OneYearPlanEdit id={item.oneYearPlanId} />
                </>
              )}
            </div>

            <div className=" flex items-center justify-between p-2">
              <span className="uppercase font-semibold">
                Goals for the Year:
              </span>
              {status === "Final" ? <></> : <GoalAdd fileId={id} />}
            </div>

            <GoalList id={id} />
          </div>
        ))}
    </div>
  );
};

export default OneYearPlanList;
