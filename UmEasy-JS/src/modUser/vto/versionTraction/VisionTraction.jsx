import { useState } from "react";
import Vision from "./Vision";
import Traction from "./Traction";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useParams } from "react-router-dom";
import StatusToggleButton from "../../../components/button/StatusToggleButton";
import DeleteButton from "../../../components/button/DeleteButton";
import PdfButton from "../../../components/button/PdfButton";
import IsPublicToggleButton from "../../../components/button/IsPublicToggleButton";

const VisionTraction = () => {
  const { id } = useParams();
  const [meetingId, setMeetingId] = useState(1);
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", `/vtofile/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Vision And Traction" />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 place-items-center">
        <h3>Name : {list.data.fullName}</h3>
        <div>Folder: {list.data.folderName}</div>
        <div>File: {list.data.fileName}</div>
        <div className="flex items-center gap-2">
          Status:
          <StatusToggleButton
            path={`/vtofile/statustoggle/${list.data.fileId}`}
            action={refetch}
            status={list.data.status}
          />
        </div>

        <div className="flex items-center gap-2">
          Is Public:
          <IsPublicToggleButton
            path={`/vtofile/isPublic/${list.data.fileId}`}
            action={refetch}
            isPublic={list.data.isPublic}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <PdfButton path={`/vtofilepdf/Preview/${list.data.fileId}`} />
          <DeleteButton
            path={`/VtoFile/delete/${list.data.fileId}`}
            returnPath="/vto"
          />
        </div>
      </div>
      {/* <div className="flex flex-col items-start mb-5"></div> */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="grid grid-cols-1">
          <button
            className={`btn btn-sm !bg-white !text-black border border-gray-600 px-4 py-2 transition duration-300 ${
              meetingId === 1 ? "ring-2 ring-yellow-400" : ""
            }`}
            onClick={() => setMeetingId(1)}
          >
            Vision
          </button>
        </div>

        <div className="grid grid-cols-1">
          <button
            className={`btn btn-sm !bg-white !text-black border border-gray-600 px-4 py-2 transition duration-300 ${
              meetingId === 2 ? "ring-2 ring-yellow-400" : ""
            }`}
            onClick={() => setMeetingId(2)}
          >
            Traction
          </button>
        </div>
      </div>

      <div className="py-4">
        {meetingId === 1 && (
          <Vision fileId={list.data.fileId} status={list.data.status} />
        )}
        {meetingId === 2 && (
          <Traction fileId={list.data.fileId} status={list.data.status} />
        )}
      </div>
    </div>
  );
};

export default VisionTraction;
