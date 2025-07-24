/* eslint-disable react/prop-types */
import React from "react";

function AgendaList({ agendas, action }) {
  return (
    <div className="col-span-1 pr-2 cursor-pointer">
      <h2 className="text-xl font-semibold text-center py-2">Agendas</h2>
      <div className="overflow-y-scroll h-80">
        <div className="grid gap-2">
          {agendas.map((item, i) => (
            <div
              className="bg-gray-100 w-full px-4 py-1 rounded shadow-md text-sm font-medium grid grid-cols-2"
              key={i}
              onClick={() => action(item.agendaName)}
            >
              <span>{item.agendaName}</span>
              <span className="flex justify-end">{item.duration} Min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgendaList;
