import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import CoreFocusEdit from "./CoreFocusEdit";

const CoreFocusList = ({ status, id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("CoreFocuslist", `/CoreFocus/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid gap-10">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center rounded-md cursor-pointer"
          >
            <div className="grid">
              <div className="flex">
                <span className="font-semibold">{item.purposeCause} : </span>
                {item.description}
              </div>
              <div>
                <span className="font-semibold">Our Niche : </span>
                {item.ourNiche}
              </div>
            </div>
            <div className="flex space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <CoreFocusEdit id={item.coreFocusId} />
                  <DeleteSmallButton
                    path={`/CoreFocus/delete/${item.coreFocusId}`}
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

export default CoreFocusList;
