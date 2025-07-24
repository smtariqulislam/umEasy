/* eslint-disable react/prop-types */
import React from "react";
import { format } from "date-fns";

function Header({ meetingType, meetingName, meetingDate, timeToStart }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="grid">
        <span>{meetingType}</span>
        <h1 className="text-3xl font-bold">{meetingName}</h1>
        <p className="text-gray-500">
          {format(new Date(meetingDate), "dd/MMM/yyyy")} {timeToStart}
        </p>
      </div>
    </div>
  );
}

export default Header;
