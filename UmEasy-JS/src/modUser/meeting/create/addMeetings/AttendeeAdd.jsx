import { TiDelete } from "react-icons/ti";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";

const AttendeeAdd = ({ meetingData, addAttendees, removeAttendee }) => {
	const {
		data: list,
		error,
		isLoading,
		isError,
	} = useGetData("userList", "/user/select");

	if (isLoading) return <HashLoading />;
	if (isError) return <Error message={error?.message} />;

	const data = list?.data || [];

	const handleSelectChange = (e) => {
		const selectedUserId = e.target.value;
		const selectedUser = data.find((user) => user.listId === selectedUserId);

		// Only add if the attendee is not already in the list
		if (
			selectedUser &&
			!meetingData.attendees.some((att) => att.listId === selectedUserId)
		) {
			addAttendees({ listId: selectedUserId, listName: selectedUser.listName });
		}
	};

	return (
		<div>
			<div className="w-full mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Attendee
				</label>
				<select
					className="form-control bg-white border border-gray-300 rounded-md shadow-sm w-full p-2"
					onChange={handleSelectChange}
					defaultValue=""
				>
					<option value="">Select a user</option>
					{data.map((attendee) => (
						<option key={attendee.listId} value={attendee.listId}>
							{attendee.listName}
						</option>
					))}
				</select>
			</div>

			{/* Display selected attendees */}
			<div className="mt-4">
				<h3 className="font-semibold mb-2">Selected Attendees:</h3>
				<div className="space-y-2">
					{/* Directly render meetingData.attendees */}
					{(meetingData.attendees || []).map((attendee) => (
						<div
							key={attendee.listId}
							className="flex items-center justify-between p-2 bg-green-100 rounded-md text-sm"
						>
							<span>{attendee.listName}</span>
							<button
								type="button"
								onClick={() => removeAttendee(attendee.listId)}
								className="text-red-500 hover:text-red-800"
							>
								<TiDelete size={30} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AttendeeAdd;
