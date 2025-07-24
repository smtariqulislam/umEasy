import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import CoreValueEdit from "./CoreValueEdit";

const CoreValueList = ({ status, id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("coreValue", `/coreValue/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid gap-2">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center rounded-md cursor-pointer"
          >
            <div className="flex">
              {i + 1}.{item.coreValueName}
            </div>
            <div className="flex space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <CoreValueEdit id={item.coreValueId} />
                  <DeleteSmallButton
                    path={`/coreValue/delete/${item.coreValueId}`}
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

export default CoreValueList;
