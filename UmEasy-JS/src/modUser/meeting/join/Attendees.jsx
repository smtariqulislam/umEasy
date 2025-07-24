/* eslint-disable react/prop-types */
import React from "react";

function Attendees({ attendees }) {
  return (
    <div className="col-span-1">
      <h2 className="text-xl font-semibold text-center py-2">Attendees</h2>
      <div className="overflow-y-scroll h-80">
        <div className="grid gap-2">
          {attendees.map((item, i) => (
            <div
              className="bg-gray-100 w-full px-4 py-1 rounded shadow-md text-sm font-medium text-center"
              key={i}
            >
              <span>{item.listName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Attendees;
