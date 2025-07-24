import { useState } from "react";
import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import RamdomButton from "../../../../../components/button/RamdomButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import RocksEdit from "./RocksEdit";

const RocksList = ({ status, id }) => {
  // const [query, setQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [quarterQuery, setQuarterQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("coreValue", `/TractionRock/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  console.log(data);

  const departmentName = [...new Set(data.map((x) => x.departmentName))];
  const quarters = [...new Set(data.map((x) => x.quarter))];

  // const { mutateAsync } = usePostData();

  // const displayData =
  //   data.length > 0
  //     ? data.filter((item) =>
  //         query
  //           ? item.departmentName.toLowerCase() === query.toLowerCase()
  //           : true
  //       )
  //     : [];

  const displayData =
    data.length > 0
      ? data.filter((item) => {
          const departmentMatch = departmentQuery
            ? item.departmentName.toLowerCase() ===
              departmentQuery.toLowerCase()
            : true;
          const quarterMatch = quarterQuery
            ? item.quarter.toLowerCase() === quarterQuery.toLowerCase()
            : true;
          return departmentMatch && quarterMatch;
        })
      : [];

  return (
    <div className="grid gap-1">
      <RamdomButton data={departmentName} action={setDepartmentQuery} />
      <RamdomButton data={quarters} action={setQuarterQuery} />

      {displayData.length > 0 &&
        displayData.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center rounded-md cursor-pointer text-sm text-black"
          >
            <div className="flex">
              {i + 1}. {item.rock}
              {/* ,,
               {item.goal},, {item.quarter},,
              {item.departmentName},, {item.rockOwnerName} */}
            </div>
            <div className="flex space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <RocksEdit id={item.rockId} />
                  <DeleteSmallButton
                    path={`/TractionRock/delete/${item.rockId}`}
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

export default RocksList;
