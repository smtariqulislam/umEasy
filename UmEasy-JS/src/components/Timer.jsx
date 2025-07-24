// import React, { useState, useEffect } from "react";
// import createPersistedState from "use-persisted-state-18";
// const useTimerValues = createPersistedState("timerValues");

// const Timer = ({ agendas }) => {
//   const [timerValues, settimerValues] = useTimerValues({
//     currentAgendaIndex: 0,
//     timeLeft: agendas[0].duration * 60,
//   });

//   useEffect(() => {
//     if (timerValues.timeLeft === 0) {
//       if (timerValues.currentAgendaIndex < agendas.length - 1) {
//         settimerValues({
//           currentAgendaIndex: timerValues.currentAgendaIndex + 1,
//           timeLeft: agendas[timerValues.currentAgendaIndex + 1].duration * 60,
//         });
//       }
//     }
//     if (timerValues.timeLeft === 0 && timerValues.isRunning) {
//       if (timerValues.currentAgendaIndex < agendas.length - 1) {
//         setTimerValues((prevValues) => ({
//           currentAgendaIndex: prevValues.currentAgendaIndex + 1,
//           timeLeft: agendas[prevValues.currentAgendaIndex + 1].duration * 60,
//           isRunning: false, // Pause the timer automatically when agenda changes
//         }));
//       }
//     } else {
//       const timerId = setInterval(() => {
//         settimerValues({
//           ...timerValues,
//           timeLeft: timerValues.timeLeft - 1,
//         });
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [timerValues.timeLeft, timerValues.currentAgendaIndex]);

//   const handleStop = () => {
//     setTimerValues((prevValues) => ({
//       ...prevValues,
//       isRunning: false,
//     }));
//   };

//   const handleReset = () => {
//     setTimerValues((prevValues) => ({
//       currentAgendaIndex: prevValues.currentAgendaIndex,
//       timeLeft: agendas[prevValues.currentAgendaIndex]?.duration * 60 || 0,
//       isRunning: false,
//     }));
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   return (
//     <div className="flex text-4xl">
//       {agendas[timerValues.currentAgendaIndex].agendaName} -{" "}
//       {formatTime(timerValues.timeLeft)}
//       <div className="flex space-x-4">
//         <button
//           className="btn-secondary px-4 py-2"
//           onClick={handleStop}
//           disabled={!timerValues.isRunning}
//         >
//           Stop
//         </button>
//         <button className="btn-danger px-4 py-2" onClick={handleReset}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from "react";
import createPersistedState from "use-persisted-state-18";
const useTimerValues = createPersistedState("timerValues");
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";
import { GrPowerReset } from "react-icons/gr";

const Timer = ({ agendas }) => {
  const [timerValues, setTimerValues] = useTimerValues({
    currentAgendaIndex: 0,
    timeLeft: agendas[0]?.duration * 60 || 0,
    isRunning: false,
  });

  useEffect(() => {
    let timerId;

    if (timerValues.isRunning && timerValues.timeLeft > 0) {
      timerId = setInterval(() => {
        setTimerValues((prevValues) => ({
          ...prevValues,
          timeLeft: prevValues.timeLeft - 1,
        }));
      }, 1000);
    }

    if (timerValues.timeLeft === 0 && timerValues.isRunning) {
      if (timerValues.currentAgendaIndex < agendas.length - 1) {
        setTimerValues((prevValues) => ({
          currentAgendaIndex: prevValues.currentAgendaIndex + 1,
          timeLeft: agendas[prevValues.currentAgendaIndex + 1].duration * 60,
          isRunning: false, // Pause the timer automatically when agenda changes
        }));
      }
    }

    return () => clearInterval(timerId);
  }, [timerValues, agendas]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleStart = () => {
    setTimerValues((prevValues) => ({
      ...prevValues,
      isRunning: true,
    }));
  };

  const handleStop = () => {
    setTimerValues((prevValues) => ({
      ...prevValues,
      isRunning: false,
    }));
  };

  const handleReset = () => {
    setTimerValues((prevValues) => ({
      currentAgendaIndex: prevValues.currentAgendaIndex,
      timeLeft: agendas[prevValues.currentAgendaIndex]?.duration * 60 || 0,
      isRunning: false,
    }));
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <h3 className="text-xl font-bold">
        {agendas[timerValues.currentAgendaIndex]?.agendaName || "No Agenda"} -{" "}
        {formatTime(timerValues.timeLeft)}
      </h3>
      <button
        className="btn-primary"
        onClick={handleStart}
        disabled={timerValues.isRunning}
      >
        <VscDebugStart size={24} />
      </button>
      <button
        className="btn-primary"
        onClick={handleStop}
        disabled={!timerValues.isRunning}
      >
        <VscStopCircle size={24} />
      </button>
      <button className="btn-primary" onClick={handleReset}>
        <GrPowerReset size={24} />
      </button>
    </div>
  );
};

export default Timer;
