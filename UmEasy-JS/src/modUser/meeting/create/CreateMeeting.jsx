import { useState } from "react";
import LavelTen from "./LevelTen";
import CustomAgenda from "./CustomAgenda";
import SamePage from "./SamePage";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";

const CreateMeeting = () => {
  const [meetingId, setMeetingId] = useState(0);

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("userinfo", `/user/userInfo`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="card w-full max-w-screen-xl mb-5">
        <TopHeader title="Meeting Create" />

        <div className="w-full justify-between flex gap-10">
          <button
            className={`w-full btn-tabs !bg-white !text-black flex flex-col border border-gray-600 transition duration-300 ${
              meetingId === 1 ? "ring-2 ring-umojayellow" : ""
            }`}
            onClick={() => setMeetingId(1)}
          >
            <span>Level 10 Meeting</span>
            <span className="text-sm font-normal">90 min</span>
          </button>

          <button
            className={`w-full btn-tabs !bg-white !text-black flex flex-col border border-gray-600 px-4 py-2 transition duration-300 ${
              meetingId === 2 ? "ring-2 ring-umojayellow" : ""
            }`}
            onClick={() => setMeetingId(2)}
          >
            <span>Same Page</span>
            <span className="text-sm font-normal">120 min</span>
          </button>
          <button
            className={`w-full btn-tabs !bg-white !text-black flex flex-col border border-gray-600 px-4 py-2 transition duration-300 ${
              meetingId === 3 ? "ring-2 ring-umojayellow" : ""
            }`}
            onClick={() => setMeetingId(3)}
          >
            <span>Custom Agenda</span>
            <span className="text-sm font-normal">Length TBD</span>
          </button>
        </div>
      </div>

      {meetingId === 1 && <LavelTen defautAttendee={list.data} />}
      {meetingId === 2 && <SamePage defautAttendee={list.data} />}
      {meetingId === 3 && <CustomAgenda defautAttendee={list.data} />}
    </>
  );
};

export default CreateMeeting;
