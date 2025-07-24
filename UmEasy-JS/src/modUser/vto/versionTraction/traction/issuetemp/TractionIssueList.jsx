import DeleteButton from "../../../../../components/button/DeleteButton";
import DeleteSmallButton from "../../../../../components/button/DeleteSmallButton";
import Error from "../../../../../components/Error";
import { ListCol } from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import TractionIssueEdit from "./TractionIssueEdit";

const TractionIssueList = ({ id, status }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userMeeting", `/IssueVto/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid grid-cols-1 gap-2">
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.issueId}
            className="grid grid-cols-5 px-2 py-1 border rounded-lg shadow-md bg-gray-50 text-sm"
          >
            <div className="col-span-4">
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Full Name:" value={item.fullName} />
            </div>

            <div className="flex space-x-2">
              {status === "Final" ? (
                <></>
              ) : (
                <>
                  <TractionIssueEdit id={item.issueId} />
                  <DeleteSmallButton
                    path={`/IssueVto/delete/${item.issueId}`}
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

export default TractionIssueList;
