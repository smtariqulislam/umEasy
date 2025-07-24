import MeetingForm from "./MeetingForm";

const SamePageAdd = ({
  meetingData,
  setMeetingData,
  addAttendees,
  removeAttendee,
}) => {
  return (
    <div className="">
      <MeetingForm
        meetingData={meetingData}
        setMeetingData={setMeetingData}
        addAttendees={addAttendees}
        removeAttendee={removeAttendee}
      />
    </div>
  );
};

export default SamePageAdd;
