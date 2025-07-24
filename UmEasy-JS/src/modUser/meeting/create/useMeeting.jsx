import { useState } from "react";

const useMeeting = (initialState) => {
	const defaultState = {
		meetingName: "",
		meetingDate: "",
		timeToStart: "",
		meetingType: "",
		repeatStatus: "",
		attendees: [],
		agendas: [],
	};

	// const [meetingData, setMeetingData] = useState(initialState || defaultState);
	const [meetingData, setMeetingData] = useState({
		...defaultState,
		...initialState,
	});

	// Function to add an attendee
	const addAttendees = (newAttendee) => {
		setMeetingData((prevData) => ({
			...prevData,
			attendees: [...prevData.attendees, newAttendee],
		}));
	};

	// Function to remove an attendee
	const removeAttendee = (userId) => {
		setMeetingData((prevData) => ({
			...prevData,
			attendees: prevData.attendees.filter((att) => att.listId !== userId),
		}));
	};

	return { meetingData, setMeetingData, addAttendees, removeAttendee };
};

export default useMeeting;
