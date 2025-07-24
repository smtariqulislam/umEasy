import { useEffect } from "react";
import CustomAgendaAdd from "./addMeetings/CustomAgendaAdd";
import useMeeting from "./useMeeting";
import AddMeetingButton from "./AddMeetingButton";
import TopHeader from "../../../components/TopHeader";

const agendas = [{ agendaName: "CONCLUDE", duration: "5" }];

const meetingtype = "Custom Agenda";

function CustomAgenda({ defautAttendee }) {
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
			<TopHeader title="Add Custom Agenda Meeting" />
			<CustomAgendaAdd
				meetingData={meetingData}
				setMeetingData={setMeetingData}
				addAttendees={addAttendees}
				removeAttendee={removeAttendee}
			/>
			<AddMeetingButton meeting={meetingData} path="/meeting/create" />
		</div>
	);
}

export default CustomAgenda;
