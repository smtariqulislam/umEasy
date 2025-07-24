import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import DeleteButton from "../../../components/button/DeleteButton";
import IssueEdit from "../issue/IssueEdit";

const MeetingIssueList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userMeeting", "/issue/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="list-wrapper overflow-y-auto max-h-96">
      {list.data.length > 0 &&
        list.data.map((item, i) => (
          <div key={i} className="max-h-80">
            <div className="grid grid-cols-2 list-body">
              <div className="flex text-lg space-x-2 ">
                <span className="">{item.title}, </span>
                <span className="">{item.meetingName}, </span>
                {/* <span className="">{item.fullName}, </span> */}
              </div>

              <div className="flex justify-end space-x-2">
                {/* <DuplicateButton
                action={refetch}
                path={`/todo/duplicate/${item.todoId}`}
              /> */}
                <IssueEdit id={item.issueId} />
                <DeleteButton
                  action={refetch}
                  path={`/Issue/delete/${item.issueId}`}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MeetingIssueList;
