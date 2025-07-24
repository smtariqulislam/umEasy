import React from "react";
// import AttendeeAdd from "./AttendeeAdd";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { format } from "date-fns";
import AttendeeUpdate from "./AttendeeUpdate";

const MeetingUpdateForm = ({
  meetingData = {},
  setMeetingData,
  addAttendees,
  removeAttendee,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setMeetingData((prevData) => ({
      ...prevData,
      meetingDate: e.target.value,
    }));
  };

  const times = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const handleTimeChange = (e) => {
    setMeetingData((prevData) => ({
      ...prevData,
      timeToStart: e.target.value,
    }));
  };

  const addAgenda = () => {
    setMeetingData((prevData) => ({
      ...prevData,
      agendas: [...(prevData.agendas || []), { agendaName: "", duration: "" }],
    }));
  };

  const updateAgenda = (index, updatedAgenda) => {
    setMeetingData((prevData) => ({
      ...prevData,
      agendas: (prevData.agendas || []).map((agenda, i) =>
        i === index ? { ...agenda, ...updatedAgenda } : agenda
      ),
    }));
  };

  const removeAgenda = (index) => {
    setMeetingData((prevData) => ({
      ...prevData,
      agendas: (prevData.agendas || []).filter((_, i) => i !== index),
    }));
  };

  const totalDuration = (meetingData.agendas || []).reduce(
    (total, agenda) => total + parseFloat(agenda.duration || 0),
    0
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full border-r px-4">
        <h2 className="text-lg font-semibold mb-4">Update Meeting Details</h2>

        <AttendeeUpdate
          meetingData={meetingData}
          addAttendees={addAttendees}
          removeAttendee={removeAttendee}
        />
        <label className="block mb-4 w-full">
          <span className="text-sm font-medium text-gray-700">
            Meeting Name:
          </span>
          <input
            type="text"
            name="meetingName"
            value={meetingData.meetingName || ""}
            onChange={handleChange}
            autoFocus
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          />
        </label>

        <div className="form-col form-col-2">
          <label className="block mb-4 w-full">
            <span className="text-sm font-medium text-gray-700">
              Meeting Date:
            </span>
            <input
              type="date"
              // value={meetingData.meetingDate || ""}
              value={format(new Date(meetingData.meetingDate), "yyyy-MM-dd")}
              onChange={handleDateChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            />
          </label>

          <label className="block mb-4 w-full">
            <span className="text-sm font-medium text-gray-700">
              Time To Start:
            </span>
            <select
              value={meetingData.timeToStart || ""}
              onChange={handleTimeChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-3"
            >
              <option value="">Select Time</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block mb-4 w-full">
          <span className="text-sm font-medium text-gray-700">
            Repeat Status:
          </span>
          <select
            name="repeatStatus"
            value={meetingData.repeatStatus || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="Continue">Continue</option>
            <option value="Cancel">Cancel</option>
          </select>
        </label>
      </div>

      <div className="px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-2 mb-2">
            <LuCalendarClock size={20} className="text-gray-700" />
            <p className="text-lg font-bold text-gray-600">Updated Meeting</p>
            {!meetingData.meetingDate == "" &&
            !meetingData.timeToStart == "" ? (
              <p className="text-sm text-blue-500">
                <span>
                  {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                    new Date(meetingData.meetingDate)
                  )}
                </span>{" "}
                at {meetingData.timeToStart} starting{" "}
                <span>
                  {format(new Date(meetingData.meetingDate), "MMMM dd")}
                </span>
              </p>
            ) : (
              <></>
            )}
          </div>
          <h2 className="mb-4">Agenda ({totalDuration} min)</h2>
        </div>
        <div className="space-y-2">
          {(meetingData.agendas || []).map((agenda, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between border p-2 rounded-md bg-gray-50 text-sm"
            >
              <div className="w-full flex-1">
                <input
                  type="text"
                  value={agenda.agendaName || ""}
                  onChange={(e) =>
                    updateAgenda(index, { agendaName: e.target.value })
                  }
                  className="border border-gray-400 rounded-md shadow-sm px-2 py-1 w-1/2 text-xs"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={agenda.duration || ""}
                  onChange={(e) =>
                    updateAgenda(index, { duration: e.target.value })
                  }
                  className="border border-gray-400 rounded-md shadow-sm px-2 py-1 w-16 text-center"
                />
                <span className="ml-1 text-sm text-gray-700">min</span>
              </div>

              <button
                type="button"
                onClick={() => removeAgenda(index)}
                className="inline-flex items-center px-3 py-1 border border-red-500 text-red-500 bg-white rounded-md text-sm font-medium hover:bg-red-50 ml-4"
              >
                <MdDeleteForever size={20} />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={addAgenda}
              className="mt-4 flex justify-between items-center space-x-2  px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded-md text-sm font-medium hover:bg-blue-50"
            >
              <span>
                <IoMdAddCircleOutline size={20} />
              </span>
              <span>Add Agenda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingUpdateForm;
