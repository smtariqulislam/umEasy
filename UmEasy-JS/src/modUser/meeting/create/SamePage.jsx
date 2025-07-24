import { useEffect } from "react";
import useMeeting from "./useMeeting";
import SamePageAdd from "./addMeetings/SamePageAdd";
import AddMeetingButton from "./AddMeetingButton";
import TopHeader from "../../../components/TopHeader";

const agendas = [
	{ agendaName: "CHECK-IN", duration: "5" },
	{ agendaName: "TO-DO LIST", duration: "5" },
	{ agendaName: "IDS", duration: "105" },
	{ agendaName: "CONCLUDE", duration: "5" },
];

const meetingtype = "Same Page";

function SamePage({ defautAttendee }) {
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
			<TopHeader title="Add Same Page Meeting" />
			<SamePageAdd
				meetingData={meetingData}
				setMeetingData={setMeetingData}
				addAttendees={addAttendees}
				removeAttendee={removeAttendee}
			/>
			<AddMeetingButton meeting={meetingData} path="/meeting/create" />
		</div>
	);
}

export default SamePage;
