import MeetingForm from "./MeetingForm";

const LevelTenAdd = ({
  meetingData,
  setMeetingData,
  addAttendees,
  removeAttendee,
}) => {
  return (
    <MeetingForm
      meetingData={meetingData}
      setMeetingData={setMeetingData}
      addAttendees={addAttendees}
      removeAttendee={removeAttendee}
    />
  );
};

export default LevelTenAdd;
