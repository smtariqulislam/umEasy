import React from "react";
import useMeeting from "../create/useMeeting";
import MeetingUpdateForm from "./MeetingUpdateForm";
import UpdateMeetingButton from "./UpdateMeetingButton";

const MeetingUpdate = ({ data, refetch }) => {
  const { meetingData, setMeetingData, addAttendees, removeAttendee } =
    useMeeting(data);

  return (
    <div className="p-4 pb-0">
      <MeetingUpdateForm
        meetingData={meetingData}
        setMeetingData={setMeetingData}
        addAttendees={addAttendees}
        removeAttendee={removeAttendee}
      />
      <UpdateMeetingButton
        meeting={meetingData}
        path={`/meeting/update/${meetingData.meetingId}`}
        refetch={refetch}
      />
    </div>
  );
};

export default MeetingUpdate;
