import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import AgendaList from "./AgendaList";
import Attendees from "./Attendees";
import Agenda from "./Agenda";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import Timer from "../../../components/Timer";

const MeetingJoin = () => {
  const { id } = useParams();
  const [showCard, setShowCard] = useState(0);

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("meetingDetails", `/meeting/details/${id}`);

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  const {
    agendas,
    attendees,
    meetingDate,
    meetingName,
    meetingType,
    timeToStart,
  } = list.data;

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-3 justify-between items-center mb-6">
        <Header
          meetingType={meetingType}
          meetingName={meetingName}
          meetingDate={meetingDate}
          timeToStart={timeToStart}
        />

        {/* Timer Section */}
        <div className="w-full flex justify-center items-center">
          <Timer agendas={agendas} action={setShowCard} />
        </div>

        <div className="flex justify-end items-center">
          <Link to="/meeting" className="btn-danger w-40 h-10">
            Leave
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {/* Agendas Section */}
        <AgendaList agendas={agendas} action={setShowCard} meetingId={id} />
        <div className="col-span-3">
          <Agenda showCard={showCard} />
        </div>

        {/* Attendees Section */}
        <Attendees attendees={attendees} />
      </div>
    </div>
  );
};

export default MeetingJoin;
