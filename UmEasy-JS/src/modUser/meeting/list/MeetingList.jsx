import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { format } from "date-fns";
import DeleteButton from "../../../components/button/DeleteButton";
import MeetingEdit from "../edit/MeetingEdit";
import { Link } from "react-router-dom";
import DuplicateButton from "../../../components/button/DuplicateButton";
import DuplicateMeetingAdd from "../duplicate/DuplicateMeetingAdd";

const MeetingList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userMeeting", "/meeting/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="mt-8 list-wrapper overflow-y-auto max-h-[32rem] ">
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.meetingId}
            className="flex flex-col xl:flex-row justify-between items-center p-4 mb-4 border rounded-lg shadow-md bg-white "
          >
            <div className="pb-2 xl:pb-0">
              {item.meetingType === "Level 10" && (
                <Link to={`/meeting/level10/${item.meetingId}`}>
                  <h4 className="text-sm font-medium">Level 10</h4>
                  <h4 className="text-lg font-semibold hover:text-blue-600">
                    {item.meetingName}
                  </h4>
                </Link>
              )}
              {item.meetingType === "Same Page" && (
                <Link to={`/meeting/samePage/${item.meetingId}`}>
                  <h4 className="text-sm font-medium">Same Page</h4>
                  <h4 className="text-lg font-semibold hover:text-blue-600">
                    {item.meetingName}
                  </h4>
                </Link>
              )}
              {item.meetingType === "Custom Agenda" && (
                <Link to={`/meeting/customAgenda/${item.meetingId}`}>
                  <h4 className="text-sm font-medium">Custom Agenda</h4>
                  <h4 className="text-lg font-semibold hover:text-blue-600">
                    {item.meetingName}
                  </h4>
                </Link>
              )}
              <div className="text-gray-600 flex items-center space-x-5">
                <span>{format(new Date(item.meetingDate), "dd-MMM-yyyy")}</span>
                <hr className="w-3" />
                <span>{item.timeToStart}</span>
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <Link
                to={`/meeting/join/${item.meetingId}`}
                className="btn-success w-20 h-10"
              >
                <p>Join</p>
              </Link>
              {/* <DuplicateButton
                action={refetch}
                path={`/meeting/duplicate/${item.meetingId}`}
              /> */}
              <DuplicateMeetingAdd
                path={`/meeting/duplicate/${item.meetingId}`}
              />
              <MeetingEdit id={item.meetingId} refetch={refetch} />
              <DeleteButton
                action={refetch}
                path={`/meeting/delete/${item.meetingId}`}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MeetingList;
