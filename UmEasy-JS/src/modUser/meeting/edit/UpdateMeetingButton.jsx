import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostData, usePutData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";

const UpdateMeetingButton = ({ meeting, path, refetch }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePutData();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false; // Track if there's any validation error

    // Validate meeting name
    if (!meeting.meetingName?.trim()) {
      toast.error("Name Required");
      hasError = true;
    }

    // Validate attendees
    if (meeting.attendees?.length === 0) {
      toast.error("Add Attendees");
      hasError = true;
    }

    // Validate agendas
    if (meeting.agendas?.length === 0) {
      toast.error("Add Agendas");
      hasError = true;
    } else {
      // Check each agenda item for non-empty `agendaName` and valid `duration`
      for (const agenda of meeting.agendas) {
        if (!agenda.agendaName || !agenda.duration) {
          toast.error("Each agenda must have a name and a duration.");
          hasError = true;
          break; // Exit loop after first error to avoid multiple toasts
        }
        if (isNaN(agenda.duration) || agenda.duration <= 0) {
          toast.error("Agenda duration must be a positive number.");
          hasError = true;
          break;
        }
      }
    }

    // Validate meeting date
    if (!meeting.meetingDate?.trim()) {
      toast.error("Meeting Date Required");
      hasError = true;
    }

    // Validate meeting start time
    if (!meeting.timeToStart?.trim()) {
      toast.error("Meeting Time Required");
      hasError = true;
    }

    // Validate repeat status
    if (!meeting.repeatStatus?.trim()) {
      toast.error("Repeat Status Required");
      hasError = true;
    }

    // Stop execution if any validation failed
    if (hasError) return;

    // Continue with submission if all fields are valid
    setSubmitting(true);
    try {
      // Uncomment and use this when ready for an actual API call
      const { status } = await mutateAsync({
        path: path,
        formData: meeting,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(`/dashboard`);
      }
      if (status === 204) {
        toast.success("Update successful!");
        refetch();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error : " + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="m-2 py-4">
      <button
        className="btn bg-success hover:bg-green-500 w-full"
        disabled={submitting}
        onClick={() => handleSubmit()}
      >
        Update Meeting
      </button>
    </div>
  );
};

export default UpdateMeetingButton;
