import { useEffect } from "react";
import LevelTenAdd from "./addMeetings/LevelTenAdd";
import useMeeting from "./useMeeting";
import AddMeetingButton from "./AddMeetingButton";
import TopHeader from "../../../components/TopHeader";

const agendas = [
  { agendaName: "SEGUE", duration: "5" },
  { agendaName: "SCORECARD", duration: "5" },
  { agendaName: "ROCK REVIEW", duration: "5" },
  { agendaName: "HEADLINES", duration: "5" },
  { agendaName: "TO-DO LIST", duration: "5" },
  { agendaName: "IDS", duration: "60" },
  { agendaName: "CONCLUDE", duration: "5" },
];

const meetingtype = "Level 10";

function LevelTen({ defautAttendee }) {
  const { meetingData, setMeetingData, addAttendees, removeAttendee } =
    useMeeting({ attendees: [defautAttendee] });

  useEffect(() => {
    setMeetingData((prevData) => ({
      ...prevData,
      agendas: agendas,
      meetingType: meetingtype,
    }));
  }, [setMeetingData]);

  return (
    <div className="card w-full max-w-screen-xl mb-5">
      <TopHeader title="Add Level 10 Meeting" />
      <LevelTenAdd
        meetingData={meetingData}
        setMeetingData={setMeetingData}
        addAttendees={addAttendees}
        removeAttendee={removeAttendee}
      />
      <AddMeetingButton meeting={meetingData} path="/meeting/create" />
    </div>
  );
}

export default LevelTen;
